const ID = generateUUID();

notifieServeur("init");

creeMurHorizontal(0);
creeMurHorizontal(95);
creeMurVertical(0);
creeMurVertical(95);
creeBloc(60, 50);

setInterval(avanceTemps, 10);