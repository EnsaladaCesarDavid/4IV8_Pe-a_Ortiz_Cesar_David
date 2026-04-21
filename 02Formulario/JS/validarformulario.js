function validar(formulario){
    //Vamos a crear una función para validar un numero mínimo de caracteres en el nombre
    if(formulario.nombre.value.length < 3){
        alert("Por favor ingrese un nombre mayor de 3 caracteres");
        formulario.nombre.focus();
        return false;
    }

    var abcOK = "QWERTYUIOPASDFGHJKLÑZXCVBNM" + " " + "qwertyuiopasdfghjklñzxcvbnm";

    var checkString = formulario.nombre.value;

    var allValid = true;

    //Tenemos que ir comparando y recorriendo la cadena caracter por caracter

    for(var i = 0; i < checkString.length; i++){
        //Necesito pasar la cadena a caracter
        var caracteres = checkString.charAt(i);
        for(var j = 0; j < abcOK.length; j++){
            if(caracteres == abcOK.charAt(j)){
                break;
            } 
        }
        if(j == abcOK.length){
            allValid = false;
            break;
        }
    }
    if(!allValid){
        alert("Por favor escriba únicamente letras en el campo nombre")
        formulario.nombre.focus();
        return false;
    }

    var campoEdad = document.getElementById('edad');
    if (campoEdad.value.trim() === "") {
        alert("Por favor ingrese su edad");
        campoEdad.focus();
        return false; 
    }

    if (parseInt(campoEdad.value) <= 0) {
        alert("Por favor ingrese una edad válida");
        campoEdad.focus();
        return false;
    }

    var campoEmail = document.getElementById('email');
    var emailValue = campoEmail.value;

    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(emailValue)) {
        alert("La dirección de email no es válida.");
        
        campoEmail.classList.add('input-error');
        campoEmail.focus();
        
        return false;
    }

    campoEmail.classList.remove('input-error');
    return true;
}