class InfosModel {
  constructor() {
    this.nbEcrans = 0;
    this.decor = { raquettes: [] };
    this.tagDecorEstModifie = [];
    this.tagDecorEstModifie.push(false);
    this.score = { a: 0, b: 0 };
    this.tempoScore = 0;
    this.signaux = [];
  }

  ajouteEcran() {
    this.nbEcrans++;
    this.decorEstModifie();
    this.signaux.push({ id: this.nbEcrans, temps: Date.now() });

    this.decor.blocs = [];
    this.decor.balle = { cx: 60, cy: 50, vx: 0.5, vy: 0.4 };
    for (let i = 0; i < this.nbEcrans * 100; i++) {
      this.decor.blocs.push({ x: i, y: 0 });
      this.decor.blocs.push({ x: i, y: 95 });
    }
    for (let j = 0; j < 100; j++) {
      this.decor.blocs.push({ x: 0, y: j });
      this.decor.blocs.push({ x: this.nbEcrans * 100 - 5, y: j });
    }

    let raquette = [];
    for (let b = 0; b < 4; b++) {
      raquette.push({ x: 50 + (this.nbEcrans - 1) * 100, y: 50 + b * 5 });
    }
    this.decor.raquettes.push(raquette);
  }

  decorEstModifie() {
    this.tagDecorEstModifie = [];
    for (let i = 0; i < this.nbEcrans + 1; i++) {
      this.tagDecorEstModifie.push(true);
    }
  }

  getNbEcrans() {
    return this.nbEcrans;
  }

  render(numeroEcran) {
    let decor = {
      blocs: [],
      balle: {
        cx: this.decor.balle.cx,
        cy: this.decor.balle.cy,
        vx: this.decor.balle.vx,
        vy: this.decor.balle.vy,
      },
      raquette: [],
    };

    this.decor.raquettes[numeroEcran - 1].forEach(function (blocRaquette) {
      decor.raquette.push({
        x: blocRaquette.x - (numeroEcran - 1) * 100,
        y: blocRaquette.y,
      });
    });

    decor.balle.cx = this.decor.balle.cx - (numeroEcran - 1) * 100;

    for (let i = 0; i < this.decor.blocs.length; i++) {
      if (this.blocEstDansDecor(this.decor.blocs[i], numeroEcran)) {
        let b = { x: this.decor.blocs[i].x, y: this.decor.blocs[i].y };
        decor.blocs.push(b);
        decor.blocs[decor.blocs.length - 1].x =
          this.decor.blocs[i].x - (numeroEcran - 1) * 100;
      }
    }

    return decor;
  }

  blocEstDansDecor(bloc, numeroEcran) {
    let xmin = (numeroEcran - 1) * 100;
    let xmax = xmin + 100;
    return bloc.x >= xmin && bloc.x < xmax;
  }

  balle(numeroEcran) {
    let b = {
      cx: this.decor.balle.cx,
      cy: this.decor.balle.cy,
      vx: this.decor.balle.vx,
      vy: this.decor.balle.vy,
    };

    b.cx = this.decor.balle.cx - (numeroEcran - 1) * 100;

    return b;
  }

  blocEn(x, y) {
    function distance(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    let OK = false;
    this.decor.blocs.forEach(function (bloc) {
      if (distance(bloc.x + 5 / 2, bloc.y + 5 / 2, x, y) <= 5 / 2) {
        OK = true;
        return;
      }
    });
    this.decor.raquettes.forEach(function (raquette) {
      raquette.forEach(function (blocRaquette) {
        if (
          distance(blocRaquette.x + 5 / 2, blocRaquette.y + 5 / 2, x, y) <=
          5 / 2
        ) {
          OK = true;
          return;
        }
        return;
      });
    });

    return OK;
  }

  avanceTemps() {
    if (this.nbEcrans == 0) return;

    this.testAPerdu();

    let vx = this.decor.balle.vx;
    let vy = this.decor.balle.vy;

    let x1 = this.decor.balle.cx;
    let y1 = this.decor.balle.cy;

    if (this.blocEn(x1 + 1 / 2 + vx, y1 + 1 / 2)) {
      vx = -vx;
    } else {
      if (this.blocEn(x1 + 1 / 2, y1 + 1 / 2 + vy)) {
        vy = -vy;
      }
    }

    let x2 = x1 + vx;
    let y2 = y1 + vy;
    this.decor.balle.cx = x2;
    this.decor.balle.cy = y2;
    this.decor.balle.vx = vx;
    this.decor.balle.vy = vy;
  }

  testAPerdu() {
    if (
      this.decor.balle.cx - this.decor.balle.vx < 10 &&
      this.tempoScore == 0
    ) {
      this.score.b++;
      this.tempoScore = 50;
    }
    if (
      this.decor.balle.cx + this.decor.balle.vx > this.nbEcrans * 100 - 10 &&
      this.tempoScore == 0
    ) {
      this.score.a++;
      this.tempoScore = 50;
    }
    this.tempoScore--;
    if (this.tempoScore < 0) {
      this.tempoScore = 0;
    }
  }

  setTagDecorEstModifie(id, x) {
    this.tagDecorEstModifie[id] = x;
  }

  getTagDecorEstModifie(id) {
    return this.tagDecorEstModifie[id];
  }

  getScore() {
    return this.score;
  }

  anyalseSignaux() {
    let t = Date.now();
    for (let i = 0; i < this.signaux.length; i++) {
      if (t - this.signaux[i].temps > 10000) {
        this.enleveEcran();
        return;
      }
    }
  }

  enleveEcran() {
    this.nbEcrans--;
    this.decorEstModifie();
    this.signaux.pop();

    this.decor.blocs = [];
    this.decor.balle = { cx: 60, cy: 50, vx: 0.5, vy: 0.4 };
    for (let i = 0; i < this.nbEcrans * 100; i++) {
      this.decor.blocs.push({ x: i, y: 0 });
      this.decor.blocs.push({ x: i, y: 95 });
    }
    for (let j = 0; j < 100; j++) {
      this.decor.blocs.push({ x: 0, y: j });
      this.decor.blocs.push({ x: this.nbEcrans * 100 - 5, y: j });
    }

    this.decor.raquettes.pop();
  }
}

let infos = new InfosModel();

setInterval(infos.avanceTemps.bind(infos), 10);
setInterval(infos.anyalseSignaux.bind(infos), 5000);

module.exports = { infos };
