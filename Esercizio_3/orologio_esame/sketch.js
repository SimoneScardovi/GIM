const numSfere = 24;
const sfere = [];
const lineeOrizzontali = [15, 30, 45];
const lineeOrizzontali2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46,47,48,49,50,51,52,53,54,55,56,57,58,59]; // Percentuali delle linee orizzontali
let diametroSfera;
let spazioTraSfere;
let altezzaFinestra;

function creaSfere() {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  document.body.appendChild(container);

  const containerRect = container.getBoundingClientRect();
  diametroSfera = containerRect.width / numSfere;
  spazioTraSfere = (containerRect.width - numSfere * diametroSfera) / (numSfere - 1);
  altezzaFinestra = containerRect.height - diametroSfera;

  // Aggiungi linee orizzontali
  for (let i = 0; i < lineeOrizzontali.length; i++) {
    const linea = document.createElement('div');
    const lineaTop = containerRect.height * (lineeOrizzontali[i] / 60);
    linea.style.position = 'absolute';
    linea.style.top = lineaTop + 'px';
    linea.style.left = '0';
    linea.style.width = '100%';
    linea.style.height = '1.5px';
    linea.style.backgroundColor = 'lightgrey';
    container.appendChild(linea);
  }
  for (let i = 0; i < lineeOrizzontali2.length; i++) {
    const linea = document.createElement('div');
    const lineaTop = containerRect.height * (lineeOrizzontali2[i] / 60);
    linea.style.position = 'absolute';
    linea.style.top = lineaTop + 'px';
    linea.style.left = '0';
    linea.style.width = '100%';
    linea.style.height = '1px';
    linea.style.backgroundColor = 'whitesmoke';
    container.appendChild(linea);
  }

  for (let i = 0; i < numSfere; i++) {
    const sfera = document.createElement('div');
    sfera.style.width = diametroSfera + 'px';
    sfera.style.height = diametroSfera + 'px';
    sfera.style.borderRadius = '50%';
    sfera.style.backgroundColor = 'red';
    sfera.style.position = 'absolute';
    sfera.style.bottom = '0';
    sfera.style.left = i * (diametroSfera + spazioTraSfere) + 'px';
    container.appendChild(sfera);
    sfere.push(sfera);
  }
}

function animaSfere() {
  const ora = new Date().getHours();
  const minuti = new Date().getMinutes();
  const secondi = new Date().getSeconds();

  for (let i = 0; i < numSfere; i++) {
    const sfera = sfere[i];
    const oraSfera = (i + 0) % 24;

    if (oraSfera === ora) {
      const targetBottomPos = altezzaFinestra * (minuti / 60);
      const currentBottomPos = parseFloat(sfera.style.bottom) || 0;

      if (currentBottomPos < targetBottomPos) {
        // Rimbalza verso l'alto
        const incremento = (targetBottomPos - currentBottomPos) / 60;
        const nuovoBottomPos = currentBottomPos + incremento;
        sfera.style.bottom = nuovoBottomPos + 'px';
      } else if (currentBottomPos > targetBottomPos) {
        // Fermati sulla cima della finestra
        sfera.style.bottom = targetBottomPos + 'px';
      }
    } else if (oraSfera <= ora) {
      // Sfera fissa sulla cima
      sfera.style.bottom = altezzaFinestra + 'px';
	  sfera.style.backgroundColor='grey'
    } else {
      // Sfera fissa sulla base
      sfera.style.bottom = '0';
    }
  }

  requestAnimationFrame(animaSfere);
}

creaSfere();
animaSfere();
