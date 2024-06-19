//-------Funcion para ordenar por estrellas y comentarios-------//

const dataOriginal2 = data;
const dataAOrdenarEstrellas = data.slice();

dataAOrdenarEstrellas.sort((a, b) => {
  if (b.estrellas !== a.estrellas) {
    return b.estrellas - a.estrellas;
  } else {
    return b.comentarios - a.comentarios;
  }
});

const dataOrdenada2 = dataAOrdenarEstrellas;

//---------------------------------------------------------------//
//----------------Funcion para odenar por categoria--------------//

const dataAOrdenarxCategoria = data.slice();

dataAOrdenarxCategoria.sort((a, b) => {
  return a.categoria.localeCompare(b.categoria);
});

const dataOrdenadaxCategoria = dataAOrdenarxCategoria;

//---------------------------------------------------------------//
//----------------Funcion para odenar por nombre--------------//

const dataAOrdenarxNombre = data.slice();

dataAOrdenarxNombre.sort((a, b) => {
  return a.nombre.localeCompare(b.nombre);
});

const dataOrdenadaxNombre = dataAOrdenarxNombre;

//---------------------------------------------------------------//
//----------------Funcion para odenar por categoria y precio--------------//

const dataAOrdenarxCatyPrecio = data.slice();

dataAOrdenarxCatyPrecio.sort((a, b) => {
  const categoriaComparison = a.categoria.localeCompare(b.categoria);
  if (categoriaComparison !== 0) {
    return categoriaComparison;
  } else {
    const precioA = parseFloat(a.precioFinal.replace("$", ""));
    const precioB = parseFloat(b.precioFinal.replace("$", ""));
    return precioA - precioB;
  }
});

const dataOrdenadaxCatyPrecio = dataAOrdenarxCatyPrecio;

//----------------------------------------------------------------//
//-------------------------Countdown1-----------------------------//

// Definir la fecha de destino del countdown (por ejemplo, 1 de enero de 2025 a las 00:00:00)
const endDate = new Date("2025-07-13T00:00:00").getTime();

// Actualizar el contador cada segundo
const countdownInterval = setInterval(() => {
  // Obtener la fecha y hora actual
  const now = new Date().getTime();

  // Calcular la diferencia entre la fecha de destino y la fecha actual
  const distance = endDate - now;

  // Calcular los días, horas, minutos y segundos restantes
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Mostrar el contador en el elemento HTML con id "countdown"
  const countdownElement = document.getElementById("countdown0");
  countdownElement.innerHTML = `
      <div class="countdown-days timer flex">
        <span><strong>${days}</strong></span>
        <span>Dias</span>
      </div>
      <div class="countdown-hours timer flex">
        <span><strong>${hours}</strong></span>
        <span>Hrs</span>
      </div>
      <div class="countdown-minutes timer flex">
      <span><strong>${minutes}</strong></span>
      <span>Mins</span>
      </div>
      <div class="countdown-seconds timer flex">
      <span><strong>${seconds}</strong></span>
      <span>Segs</span>
      </div>
        `;

  // Si la cuenta regresiva ha terminado, limpiar el intervalo
  if (distance <= 0) {
    clearInterval(countdownInterval);
    countdownElement.innerHTML = "¡El countdown ha terminado!";
  }
}, 1000); // Actualizar cada segundo

//----------------------------------------------------------------//
//-------------------------Countdown2-----------------------------//

// Definir la fecha de destino del countdown (por ejemplo, 1 de enero de 2025 a las 00:00:00)
const endDate2 = new Date("2025-10-11T00:00:00").getTime();

// Actualizar el contador cada segundo
const countdownInterval2 = setInterval(() => {
  // Obtener la fecha y hora actual
  const now2 = new Date().getTime();

  // Calcular la diferencia entre la fecha de destino y la fecha actual
  const distance2 = endDate2 - now2;

  // Calcular los días, horas, minutos y segundos restantes
  const days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
  const hours2 = Math.floor(
    (distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
  const seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);

  // Mostrar el contador en el elemento HTML con id "countdown"
  const countdownElement2 = document.getElementById("countdown1");
  countdownElement2.innerHTML = `
      <div class="countdown-days timer flex">
        <span><strong>${days2}</strong></span>
        <span>Dias</span>
      </div>
      <div class="countdown-hours timer flex">
        <span><strong>${hours2}</strong></span>
        <span>Hrs</span>
      </div>
      <div class="countdown-minutes timer flex">
      <span><strong>${minutes2}</strong></span>
      <span>Mins</span>
      </div>
      <div class="countdown-seconds timer flex">
      <span><strong>${seconds2}</strong></span>
      <span>Segs</span>
      </div>
        `;

  // Si la cuenta regresiva ha terminado, limpiar el intervalo
  if (distance2 <= 0) {
    clearInterval(countdownInterval2);
    countdownElement2.innerHTML = "¡El countdown ha terminado!";
  }
}, 1000); // Actualizar cada segundo

