function calcularDescuento() {
  const inputMonto = document.getElementById("monto");
  const contenedorResultado = document.getElementById("resultado");

  const monto = parseFloat(inputMonto.value);
  const descuento = 0.15;

  contenedorResultado.innerHTML = "";

  if (isNaN(monto) || monto <= 0) {
    contenedorResultado.innerText = "Por favor, ingrese una cantidad válida.";
    contenedorResultado.style.color = "red";
    return;
  }

  contenedorResultado.style.color = "#333";

  const precioDescontado = monto * descuento;
  const totalFinal = monto - precioDescontado;

  contenedorResultado.innerHTML = `
        <p><strong>Descuento:</strong> $${precioDescontado.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</p>
        <p><strong>Total final:</strong> $${totalFinal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</p>
    `;
}
