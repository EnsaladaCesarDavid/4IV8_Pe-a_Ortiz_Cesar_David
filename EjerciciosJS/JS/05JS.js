function calcularPorcentajes() {
    const hombres = parseInt(document.getElementById('numHombres').value);
    const mujeres = parseInt(document.getElementById('numMujeres').value);
    const contenedor = document.getElementById('resultado');

    if (isNaN(hombres) || isNaN(mujeres) || (hombres === 0 && mujeres === 0)) {
        contenedor.innerHTML = "<p style='color:red;'>Por favor, ingrese cantidades válidas.</p>";
        return;
    }

    const totalEstudiantes = hombres + mujeres;
    const porcentajeHombres = (hombres / totalEstudiantes) * 100;
    const porcentajeMujeres = (mujeres / totalEstudiantes) * 100;

    contenedor.innerHTML = `
        <p>Total de alumnos: <strong>${totalEstudiantes}</strong></p>
        <p>Hombres: <span class="res-hombres">${porcentajeHombres.toFixed(1)}%</span></p>
        <p>Mujeres: <span class="res-mujeres">${porcentajeMujeres.toFixed(1)}%</span></p>
    `;
}