function calcularCalificacion() {
    const parciales = document.querySelectorAll('.parcial');
    const examenFinal = parseFloat(document.getElementById('examenFinal').value);
    const trabajoFinal = parseFloat(document.getElementById('trabajoFinal').value);
    const contenedor = document.getElementById('resultado');

    var sumaParciales = 0;
    var datosValidos = true;

    parciales.forEach(input => {
        const valor = parseFloat(input.value);
        if (isNaN(valor) || valor < 0 || valor > 10) datosValidos = false;
        sumaParciales += valor;
    });

    if (isNaN(examenFinal) || isNaN(trabajoFinal) || examenFinal < 0 || trabajoFinal < 0 || examenFinal > 10 || trabajoFinal > 10) {
        datosValidos = false;
    }


    if (!datosValidos) {
        contenedor.innerHTML = "<span style='color:red;'>Todas las calificaciones deben ser entre 0 y 10</span>";
        return;
    }

    const promedioParciales = sumaParciales / 3;

    const parteParciales = promedioParciales * 0.55;
    const parteExamen = examenFinal * 0.30;
    const parteTrabajo = trabajoFinal * 0.15;

    const notaFinal = parteParciales + parteExamen + parteTrabajo;

    contenedor.innerHTML = `
        <p>Promedio Parciales (55%): ${parteParciales.toFixed(2)}</p>
        <p>Examen Final (30%): ${parteExamen.toFixed(2)}</p>
        <p>Trabajo Final (15%): ${parteTrabajo.toFixed(2)}</p>
        <hr>
        <p><strong>Calificación Final: ${notaFinal.toFixed(2)}</strong></p>
    `;
}