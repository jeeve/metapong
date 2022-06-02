//const ID = generateUUID();

const numeroEcran = 0;

register().then(data => document.querySelector("#ecran").innerHTML = JSON.stringify(data));


/*
notifieServeur("init");

creeMurHorizontal(0);
creeMurHorizontal(95);
creeMurVertical(0);
creeMurVertical(95);
creeBloc(60, 50);

setInterval(avanceTemps, 10);
*/

