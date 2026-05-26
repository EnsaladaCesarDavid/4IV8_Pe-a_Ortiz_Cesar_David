//Aqui necesitamos creal el orden para que el controlador obtenga la peticion, sepa la ruta para poderla atender y de ahi se conecte a la bd y realize la accion correspondiente

//Ahora que ya hizo la accion poder generar la respuesta a partir del controlador a la vista

const express = require('express');
const router = express.Router();
//Este Router() es el que se encarga de organizar a cada ruta de forma interna

const bd = require('../db/database')

//Por cada accion debo de programar los elementos correspondientes del usuario

//funcion para validar user y pass

function validarUsuario(datos){
    const errores = [];

    if(!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim().length < 2){
        errores.push('El nombre es obligatorio y debe de tener al menos 2 caracteres');
    }

    if(!datos.email || typeof datos.nombre !== 'string'){
        errores.push('El email es obligatorio, verificalo');
    } else{
        //Expresion regular para validar
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(datos.email)){
            errores.push('El formato del email no es válido');
        }
    }
    return errores;
}

//Vamos a mostrar todos los usuarios
router.get('/', async (req, res) => {
    try{
        const [usuarios] = await bd.execute(
            //Necesitamos primero la query
            'Select id, nombre, email, created_at, updated_at FROM usuarios order by id ASC'
        );

        //Debo convertirlo a json
        res.json({
            status : 'success',
            data : usuarios,
            count : usuarios.length
        });
    } catch(error){
        console.log('Error al listar los usuarios: ', error.message);
        res.status(500).json({
            status : 'error',
            message : 'Error interno del servidor'
        });
    }
});