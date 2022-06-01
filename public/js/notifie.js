function notifieServeur(message) {
  const balle = document.querySelector("circle");
  const vx = parseFloat(balle.getAttribute("vx"));
  const vy = parseFloat(balle.getAttribute("vy"));

  const cx = parseFloat(balle.getAttribute("cx"));
  const cy = parseFloat(balle.getAttribute("cy"));

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: ID,
      message: message,
      cx: cx,
      cy: cy,
      vx: vx,
      vy: vy,
    }),
    mode: "cors",
    credentials: "same-origin",
  };

  fetch("http://localhost:5500/clients/", init).then(() => {
    console.log("data envoyée");
  });
}

function register(ID) {

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: ID,
    }),
    mode: "cors",
    credentials: "same-origin",
  };

  fetch("http://localhost:5500/register/", init).then(response => response.json())
   .then(response => document.querySelector("#ecran").innerHTML = JSON.stringify(response));

}


//  fetch("http://localhost:5500/quisuisje/", init).then(response => response.json())
//  .then(response => document.querySelector("#ecran").innerHTML = JSON.stringify(response));


