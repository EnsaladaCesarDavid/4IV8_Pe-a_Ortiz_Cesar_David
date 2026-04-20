function calcularEdad() {
    const fechaInput = document.getElementById('fechaNacimiento').value;
    const contenedor = document.getElementById('resultado');

    if (!fechaInput) {
        contenedor.innerHTML = "<span style='color: #d63031;'>Por favor, elige una fecha.</span>";
        return;
    }

    const hoy = new Date();
    const nacimiento = new Date(fechaInput);

    var edad = hoy.getFullYear() - nacimiento.getFullYear();

    const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();
    const diferenciaDias = hoy.getDate() - nacimiento.getDate();

    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && diferenciaDias < 0)) {
        edad--;
    }

    if (edad < 0) {
        contenedor.innerHTML = "<span style='color: #d63031;'>No ha ocurrido esta fecha, ingrese una fecha válida</span>";
    } else {
        contenedor.innerHTML = `Tiene <strong>${edad}</strong> años.`;
    }
}