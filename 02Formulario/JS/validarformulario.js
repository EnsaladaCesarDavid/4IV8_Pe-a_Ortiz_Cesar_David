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
}