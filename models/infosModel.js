class InfosModel {
  constructor() {
    this.nbEcrans = 0;
    this.decor = { blocs: [] };
    this.balle = { x: 60, y: 50 };

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

  getDecor(numeroEcran) {
    let blocs = [];
    for (let i = 0; i < this.decor.blocs.length; i++) {
      if (numeroEcran == 1 && this.decor.blocs[i].x < 100) {
        blocs.push(this.decor.blocs[i]);
      }
      if (
        numeroEcran == 2 &&
        this.decor.blocs[i].x > 100 &&
        this.decor.blocs[i].x < 200
      ) {
        blocs.push({
          x: this.decor.blocs[i].x - 100,
          y: this.decor.blocs[i].y,
        });
      }
      if (numeroEcran == 3 && this.decor.blocs[i].x > 200) {
        blocs.push({
          x: this.decor.blocs[i].x - 200,
          y: this.decor.blocs[i].y,
        });
      }
    }
    return { blocs: blocs };
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
}

let infos = new InfosModel();

module.exports = { infos };
