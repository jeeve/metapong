class InfosModel {
  constructor() {
    this.nbEcrans = 0;
    this.decor = { blocs: [], balle: { cx: 60, cy: 50, vx: 5, vy: 3 } };

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
    return OK;
  }

  avanceTemps() {
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
}

let infos = new InfosModel();

setInterval(infos.avanceTemps.bind(infos), 1000);

module.exports = { infos };
