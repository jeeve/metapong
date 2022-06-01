class InfosModel {
  
  constructor(nbEcrans) {
    this.nbEcrans = nbEcrans;
  }

  render(indiceEcran) {
    let blocs = [];
    for (i = 0; i < 60; i++) {
       blocs.push({ x : i, y : 0 });
       blocs.push({ x : i, y : 94 });   
    }
    return { blocs : blocs };
  }

}

let infos = new InfosModel();

module.exports = { InfosModel, infos };
