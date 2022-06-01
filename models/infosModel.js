class InfosModel {
  
  constructor() {
    this.nbEcrans = 0;
  }

  render(indiceEcran) {
    let blocs = [];
    for (i = 0; i < 60; i++) {
       blocs.push({ x : i, y : 0 });
       blocs.push({ x : i, y : 94 });   
    }
    return { blocs : blocs };
  }

  ajouteEcran() {
    this.nbEcrans++;
  }

  getNbEcrans() {
    return this.nbEcrans;
  }

}

let infos = new InfosModel();

module.exports = { InfosModel, infos };
