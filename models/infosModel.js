const cx0 = 60;
const cy0 = 50;
const vx0 = 0.5;
const vy0 = 0.4;
const rx = 50;
const ry = 50;
const nbViesBriques = 0;

class InfosModel {
  constructor() {
    this.nbEcrans = 0;
    this.decor = { raquettes: [] };
    this.tagDecorEstModifie = [false];
    this.score = { a: 0, b: 0 };
    this.tempoScore = 0;
    this.signaux = [];
    this.idEcransModifies = [];
    this.alerte = false;
    this.nouvellesBriques = [];
    this.briquesMortes = [];
  }

  ajouteEcran() {
    this.nbEcrans++;
    console.log(
      Date() + " - ajoute écran " + this.nbEcrans + " / " + this.nbEcrans
    );
    this.signaux.push({ id: this.nbEcrans, temps: Date.now() });
    this.decorEstModifie();
    this.contruitDecor();
  }

  contruitDecor() {
    this.decor.blocs = [];
    this.decor.balle = { cx: cx0, cy: cy0, vx: vx0, vy: vy0 };
    for (let i = 0; i < this.nbEcrans * 100; i++) {
      this.decor.blocs.push({ x: i, y: 0, classe: "bloc" });
      this.decor.blocs.push({ x: i, y: 95, classe: "bloc" });
    }
    for (let j = 0; j < 100; j++) {
      this.decor.blocs.push({ x: 0, y: j, classe: "bloc" });
      this.decor.blocs.push({
        x: this.nbEcrans * 100 - 5,
        y: j,
        classe: "bloc",
      });
    }

    this.decor.raquettes = [];
    for (let r = 0; r < this.nbEcrans; r++) {
      let raquette = [];
      for (let b = 0; b < 4; b++) {
        raquette.push({ x: rx + r * 100, y: ry + b * 5 });
      }
      this.decor.raquettes.push(raquette);
    }
  }

  decorEstModifie() {
    this.tagDecorEstModifie = [];

    for (let i = 0; i < this.nbEcrans + 1; i++) {
      this.tagDecorEstModifie.push(true);
    }
  }

  render(numeroEcran) {
    if (this.nbEcrans > 0) {
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
          let b = {
            x: this.decor.blocs[i].x,
            y: this.decor.blocs[i].y,
            classe: this.decor.blocs[i].classe,
          };
          decor.blocs.push(b);
          decor.blocs[decor.blocs.length - 1].x =
            this.decor.blocs[i].x - (numeroEcran - 1) * 100;
        }
      }

      return decor;
    } else {
      return {};
    }
  }

  blocEstDansDecor(bloc, numeroEcran) {
    let xmin = (numeroEcran - 1) * 100;
    let xmax = xmin + 100;
    return bloc.x >= xmin && bloc.x < xmax;
  }

  getBalle(numeroEcran) {
    if (this.nbEcrans > 0) {
      let b = {
        cx: this.decor.balle.cx,
        cy: this.decor.balle.cy,
        vx: this.decor.balle.vx,
        vy: this.decor.balle.vy,
      };

      b.cx = this.decor.balle.cx - (numeroEcran - 1) * 100;

      return b;
    } else {
      return {};
    }
  }

  creeBrique() {
    function rand_5(min, max) {
      return Math.round((Math.random() * (max - min) + min) / 5) * 5;
    }

    if (this.nbEcrans > 0) {
      const chercheMax = 100;
      let n = 1;
      while (n < chercheMax) {
        let x = rand_5(5, 100 * this.nbEcrans - 10);
        let OK = true;
        for (let i = 0; i < this.nbEcrans; i++) {
          // verifie qu'on est pas sur la verticle d'une raquette
          if (x == rx + i * 100) {
            OK = false;
          }
        }
        if (OK) {
          let y = rand_5(5, 90);
          let b = { x: x, y: y };
          if (!this.blocEn(b.x, b.y)) {
            this.decor.blocs.push({
              x: b.x,
              y: b.y,
              classe: "brique",
              vie: nbViesBriques,
            });
            return b;
          }
        }
        n++;
      }
      return {};
    } else {
      return {};
    }
  }

  getIndiceBlocEn(x, y) {
    function distance(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    let indice = -1;
    this.decor.blocs.forEach(function (bloc, i) {
      if (distance(bloc.x + 5 / 2, bloc.y + 5 / 2, x, y) <= 5 / 2) {
        indice = i;
        return;
      }
    });
    this.decor.raquettes.forEach(function (raquette) {
      raquette.forEach(function (blocRaquette, i) {
        if (
          distance(blocRaquette.x + 5 / 2, blocRaquette.y + 5 / 2, x, y) <=
          5 / 2
        ) {
          indice = i;
          return;
        }
        return;
      });
    });

    return indice;
  }

  blocEn(x, y) {
    return this.getIndiceBlocEn(x, y) > -1;
  }

  toucheBloc(x, y) {
    let i = this.getIndiceBlocEn(x, y);
    if (i > -1) {
      let bloc = this.decor.blocs [i];
      if (bloc.classe == 'brique') {
        if (bloc.vie > 0) {
          bloc.vie--;
        } else {
          let b = {};
          Object.assign(b, bloc);
          this.briquesMortes.push(b);
          this.decor.blocs.splice(i, 1);
        }
      }
      return true;
    }
    return false;
  }

  avanceTemps() {
    if (this.nbEcrans < 1) return;

    this.testAPerdu();

    let vx = this.decor.balle.vx;
    let vy = this.decor.balle.vy;

    let x1 = this.decor.balle.cx;
    let y1 = this.decor.balle.cy;

    let vxt = vx; // gestion des vitesses lentes
    let vyt = vy;

    if (vxt > vx0) {
      vxt = vx0;
    }
    if (vxt < -vx0) {
      vxt = -vx0;
    }
    if (vyt > vy0) {
      vyt = vy0;
    }
    if (vyt < -vy0) {
      vyt = -vy0;
    }

    if (this.toucheBloc(x1 + 1 / 2 + vxt, y1 + 1 / 2)) {
      vx = -vx;
    } else if (
      this.toucheBloc(x1 + 1 / 2 + vxt, y1 + 1 / 2) &&
      this.toucheBloc(x1 + 1 / 2, y1 + 1 / 2 + vyt)
    ) {
      vx = -vx;
      vy = -vy;
    } else if (this.toucheBloc(x1 + 1 / 2, y1 + 1 / 2 + vyt)) {
      vy = -vy;
    } else if (this.toucheBloc(x1 + 1 / 2 + vx, y1 + 1 / 2)) {
      vx = -vx;
    } else if (this.toucheBloc(x1 + 1 / 2, y1 + 1 / 2 + vy)) {
      vy = -vy;
    } else if (
      this.toucheBloc(x1 + 1 / 2 + vx, y1 + 1 / 2) &&
      this.toucheBloc(x1 + 1 / 2, y1 + 1 / 2 + vy)
    ) {
      vx = -vx;
      vy = -vy;
    }

    let x2 = x1 + vx;
    let y2 = y1 + vy;
    if (this.EstDansJeu(x2, y2)) {
      this.decor.balle.cx = x2;
      this.decor.balle.cy = y2;
      this.decor.balle.vx = vx;
      this.decor.balle.vy = vy;
    } else {
      this.decor.balle.cx = cx0;
      this.decor.balle.cy = cy0;
    }
  }

  EstDansJeu(x, y) {
    return x > 0 && x < this.nbEcrans * 100 && y > 0 && y < 100;
  }

  testAPerdu() {
    if (
      this.decor.balle.cx - this.decor.balle.vx < 10 &&
      this.tempoScore == 0
    ) {
      this.score.b++;
      this.tempoScore = 50 / Math.abs(this.decor.balle.vx);
    }
    if (
      this.decor.balle.cx + this.decor.balle.vx > this.nbEcrans * 100 - 10 &&
      this.tempoScore == 0
    ) {
      this.score.a++;
      this.tempoScore = 50 / Math.abs(this.decor.balle.vx);
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
    if (this.nbEcrans > 0) {
      let t = Date.now();
      for (let i = 0; i < this.signaux.length; i++) {
        if (t - this.signaux[i].temps > 6000) {
          this.enleveEcran(this.signaux[i].id);
          this.signaux = [];
          for (let i = 0; i < this.nbEcrans; i++) {
            this.signaux.push({ id: i + 1, temps: Date.now() });
          }
          return;
        }
      }
    }
  }

  enleveEcran(n) {
    this.idEcransModifies = [];
    for (let i = n + 1; i < this.nbEcrans + 1; i++) {
      this.idEcransModifies.push({ id: i, nouvelId: i - 1 });
    }
    console.log(Date() + " - enlève écran " + n + " / " + this.nbEcrans);
    this.nbEcrans--;
    if (this.nbEcrans < 1) {
      this.decor = { raquettes: [] };
      this.tagDecorEstModifie = [false];
      this.score = { a: 0, b: 0 };
      this.tempoScore = 0;
      this.signaux = [];
      this.idEcransModifies = [];
      this.alerte = false;
      this.nouvellesBriques = [];
      this.briquesMortes = [];
    } else {
      this.decorEstModifie();
      this.contruitDecor();
    }
  }
}

let infos = new InfosModel();

setInterval(infos.avanceTemps.bind(infos), 10);
setInterval(infos.anyalseSignaux.bind(infos), 5000);

module.exports = { infos };
