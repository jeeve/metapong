class InfosModel {
  constructor() {
    this.nbEcrans = 0;
    this.decor = { raquettes: [] };
    this.tagDecorEstModifie = [];
    this.tagDecorEstModifie.push(false);
  }

  ajouteEcran() {
    this.nbEcrans++;
    this.decorEstModifie();

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

    this.decor.raquettes.push({ x: 50, y: 50 });
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
      raquette: { x: this.decor.raquettes[numeroEcran-1].x - (numeroEcran - 1) * 100, y: this.decor.raquettes[numeroEcran-1].y }
    };
  
    decor.balle.cx = this.decor.balle.cx - (numeroEcran - 1) * 100;

    for (let i = 0; i < this.decor.blocs.length; i++) {
      if (this.blocEstDansDecor(this.decor.blocs[i], numeroEcran)) {
        let b = { x: this.decor.blocs[i].x, y: this.decor.blocs[i].y };
        decor.blocs.push(b);
        decor.blocs[decor.blocs.length-1].x = this.decor.blocs[i].x - (numeroEcran - 1) * 100;
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
      let xb = bloc.x;
      let yb = bloc.y;
      if (distance(xb + 5 / 2, yb + 5 / 2, x, y) <= 5 / 2) {
        OK = true;
        return;
      }
    });

    this.decor.raquettes.forEach(function (raquette) {
      let xb = raquette.x;
      let yb = raquette.y;
      if (distance(xb + 5 / 2, yb + 5 / 2, x, y) <= 5 / 2) {
        OK = true;
        return;
      }
    });
    return OK;
  }

  avanceTemps() {
    if (this.nbEcrans == 0) return;

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

  setTagDecorEstModifie(id, x) {
    this.tagDecorEstModifie[id] = x;
  }

  getTagDecorEstModifie(id) {
    return this.tagDecorEstModifie[id];
  }
}

let infos = new InfosModel();

setInterval(infos.avanceTemps.bind(infos), 10);

module.exports = { infos };
