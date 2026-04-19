
function calcularSueldoTotal() {
    const sueldoBase = parseFloat(document.getElementById('sueldoBase').value);
    const inputsVentas = document.querySelectorAll('.venta');
    const contenedorResultado = document.getElementById('resultado');
    
    var sumaVentas = 0;
    var hayError = false;

    inputsVentas.forEach(input => {
        const valor = parseFloat(input.value);
        if (isNaN(valor) || valor < 0) {
            hayError = true;
        } else {
            sumaVentas += valor;
        }
    });

    if (isNaN(sueldoBase) || sueldoBase < 0 || hayError) {
        contenedorResultado.innerHTML = "<p style='color: red;'>Por favor, complete todos los campos con valores válidos.</p>";
        return;
    }
    const porcentajeComision = 0.10;
    const totalComisiones = sumaVentas * porcentajeComision;
    const pagoTotalMes = sueldoBase + totalComisiones;

    contenedorResultado.innerHTML = `
        <p>Total de ventas: $${sumaVentas.toLocaleString()}</p>
        <p>Comisiones (10%): <span class="highlight">$${totalComisiones.toLocaleString()}</span></p>
        <p><strong>Total a recibir: $${pagoTotalMes.toLocaleString()}</strong></p>
    `;
}