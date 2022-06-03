class InfosModel {
  constructor() {
    this.nbEcrans = 0;
    this.decor = { blocs: [], balle: { cx: 60, cy: 50, vx: 10, vy: 5 } };

    for (let i = 0; i < 300; i++) {
      this.decor.blocs.push({ x: i, y: 0 });
      this.decor.blocs.push({ x: i, y: 95 });
    }
    for (let j = 0; j < 100; j++) {
      this.decor.blocs.push({ x: 0, y: j });
      this.decor.blocs.push({ x: 295, y: j });
    }
  }

  ajouteEcran() {
    this.nbEcrans++;
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
    };

    if (numeroEcran == 2) {
      decor.balle.cx = this.decor.balle.cx - 100;
    }
    if (numeroEcran == 3) {
      decor.balle.cx = this.decor.balle.cx - 200;
    }

    let blocs = [];
    for (let i = 0; i < this.decor.blocs.length; i++) {
      if (numeroEcran == 1 && this.decor.blocs[i].x < 100) {
        decor.blocs.push(this.decor.blocs[i]);
      }
      if (
        numeroEcran == 2 &&
        this.decor.blocs[i].x > 100 &&
        this.decor.blocs[i].x < 200
      ) {
        decor.blocs.push({
          x: this.decor.blocs[i].x - 100,
          y: this.decor.blocs[i].y,
        });
      }
      if (numeroEcran == 3 && this.decor.blocs[i].x > 200) {
        decor.blocs.push({
          x: this.decor.blocs[i].x - 200,
          y: this.decor.blocs[i].y,
        });
      }
    }
    return decor;
  }

  blocEn(x, y) {
    let OK = false;
    this.blocs.forEach(function (bloc) {
      let xb = parseFloat(bloc.getAttribute("x"));
      let yb = parseFloat(bloc.getAttribute("y"));
      if (distance(xb + 5 / 2, yb + 5 / 2, x, y) <= 5 / 2) {
        OK = true;
        return;
      }
    });
    return OK;
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  avanceTemps() {
    let vx = this.balle.vx;
    let vy = this.balle.vy;

    let x1 = this.balle.cx;
    let y1 = this.balle.cy;

    if (blocEn(x1 + 1 / 2 + vx, y1 + 1 / 2)) {
      vx = -vx;
    } else {
      if (blocEn(x1 + 1 / 2, y1 + 1 / 2 + vy)) {
        vy = -vy;
      }
    }

    let x2 = x1 + vx;
    let y2 = y1 + vy;
    this.balle.cx = x2;
    this.balle.cy = y2;
    this.balle.vx = vx;
    this.balle.vy = vy;
  }
}

let infos = new InfosModel();

module.exports = { infos };
