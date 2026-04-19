function calcularGanancia() {
  const inputMonto = document.getElementById("monto");
  const contenedorResultado = document.getElementById("resultado");

  const monto = parseFloat(inputMonto.value);
  const tasaMensual = 0.02;

  contenedorResultado.innerHTML = "";

  if (isNaN(monto) || monto <= 0) {
    contenedorResultado.innerText = "Por favor, ingrese una cantidad válida.";
    contenedorResultado.style.color = "red";
    return;
  }

  contenedorResultado.style.color = "#333";

  const ganancia = monto * tasaMensual;
  const totalFinal = monto + ganancia;

  contenedorResultado.innerHTML = `
        <p><strong>Ganancia:</strong> $${ganancia.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</p>
        <p><strong>Total al mes:</strong> $${totalFinal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</p>
    `;
}
