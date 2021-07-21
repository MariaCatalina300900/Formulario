const formulario=document.getElementById('formulario');
const inputs=document.querySelectorAll('#formulario input');//arreglo de todos los inputs, el numeral es porque es un ID

const expresiones = {//objeto 1223
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre1: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    nombre2: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido1: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido2: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
    password2: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}
let nombres=['usuario','nombre1','nombre2','apellido1','apellido2','password','password2','correo','telefono']

let grup=['grupo__usuario','grupo__nombre1','grupo__nombre2','grupo__apellido1','grupo__apellido2','grupo__password','grupo__password2','grupo__correo','grupo__telefono']


const campos={//objeto en donde todas sus variables se encuentran el false
    usuario: false,
    nombre1:false,
    nombre2:false,
    apellido1:false,
    apellido2:false,
    password:false,
    correo:false,
    telefono:false
}
const validarFormulario=(e)=>{//funcion de tipo flecha que es evaluada con keyup
    switch(e.target.name) {//Evalua el name del input
        case "usuario":
            validarInformacion(expresiones.usuario.test(e.target.value),'grupo__usuario','usuario') 
        break;

        case "nombre1":
            validarInformacion(expresiones.nombre1.test(e.target.value),'grupo__nombre1','nombre1') 
        break;

        case "nombre2":
            validarInformacion(expresiones.nombre2.test(e.target.value),'grupo__nombre2','nombre2') 
        break;

        case "apellido1":
            validarInformacion(expresiones.apellido1.test(e.target.value),'grupo__apellido1','apellido1') 
        break;

        case "apellido2":
            validarInformacion(expresiones.apellido2.test(e.target.value),'grupo__apellido2','apellido2')
        break;

        case "password":
            validarInformacion(expresiones.password.test(e.target.value),'grupo__password','password')

            var contra1=document.getElementById('password');
            var contra2=document.getElementById('password2');

            if(contra2.value!=""){
                compararPassword(contra1,contra2)
            }

        break;

        case "password2":

            var contra1=document.getElementById('password');
            var contra2=document.getElementById('password2');

            compararPassword(contra1,contra2)

        break;

        case "correo":
            validarInformacion(expresiones.correo.test(e.target.value), 'grupo__correo','correo')
            
        break;

        case "telefono":

            validarInformacion(expresiones.telefono.test(e.target.value), 'grupo__telefono','telefono')
        break;
    }
}

inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);    
});
var btn=document.querySelector('.fomulario__btn')
    btn.addEventListener('click',(e)=>{
    e.preventDefault();//previene que sea enviado
    console.log('hola');

    const terminos=document.getElementById('terminos');

    if(campos.usuario && campos.nombre1 && campos.nombre2 && campos.apellido1 && campos.apellido2 && campos.password && campos.correo && campos.telefono && terminos.checked)
    {
        formulario.reset();// se reinician todos los campos del formulario
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo')

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono)=>{
            icono.classList.remove('formulario__grupo-correcto');//borra los iconos 
        });

        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo')

        document.querySelector('#grupo__terminos .formulario__input-errorn').classList.remove('formulario__input-error-activo');
    }
    else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
    
        for (var i = 0; i < 9; i++) {
            var y=document.getElementById(nombres[i]);
            if(y.value==""){
                validarInfo2(grup[i],nombres[i])
            }
            y="";
        }
        if(terminos.checked==false){
            document.querySelector('#grupo__terminos .formulario__input-errorn').classList.add('formulario__input-error-activo');
        }
    }
    
})

function compararPassword(contra1,contra2){
   
    if(contra1.value!=contra2.value){

        document.getElementById('grupo__password2').classList.add('formulario__grupo-incorrecto')

        document.getElementById('grupo__password2').classList.remove('formulario__grupo-correcto')

        document.querySelector('#grupo__password2 i').classList.add('fa-times-circle');
        document.querySelector('#grupo__password2 i').classList.remove('fa-check-circle');
        document.querySelector('#grupo__password2 .formulario__input-error').classList.add('formulario__input-error-activo');
        campos['password']=false;

    }else if(contra1.value==contra2.value && contra1.value!="" && contra1.  value!=""){
        document.getElementById('grupo__password2').classList.remove('formulario__grupo-incorrecto')

        document.getElementById('grupo__password2').classList.add('formulario__grupo-correcto')

        document.querySelector('#grupo__password2 i').classList.add('fa-check-circle');
        document.querySelector('#grupo__password2 i').classList.remove('fa-times-circle');
        document.querySelector('#grupo__password2 .formulario__input-error').classList.remove('formulario__input-error-activo'); 
        campos['password']=true;
    }
}
function validarInformacion(campoAValidar, grupoAValidar,variable){

    var x=document.getElementById(variable);

    if(x.value==""){
        
        document.getElementById(grupoAValidar).classList.add('formulario__grupo-incorrecto')

        document.getElementById(grupoAValidar).classList.remove('formulario__grupo-correcto')

        document.querySelector('#'+grupoAValidar+' i').classList.add('fa-times-circle');
        document.querySelector('#'+grupoAValidar+' i').classList.remove('fa-check-circle');
        
        document.querySelector('#'+grupoAValidar+ ' .formulario__input-errorn').classList.add('formulario__input-error-activo');
        document.querySelector('#'+grupoAValidar+ ' .formulario__input-error').classList.remove('formulario__input-error-activo');
        campos[variable]=false;
    }

    if(x.value!=""){
        console.log(x);
        document.getElementById(grupoAValidar).classList.add('formulario__grupo-incorrecto')

        document.getElementById(grupoAValidar).classList.remove('formulario__grupo-correcto')

        document.querySelector('#'+grupoAValidar+' i').classList.add('fa-times-circle');
        document.querySelector('#'+grupoAValidar+' i').classList.remove('fa-check-circle');
        document.querySelector('#'+grupoAValidar+ ' .formulario__input-error').classList.add('formulario__input-error-activo');
        document.querySelector('#'+grupoAValidar+ ' .formulario__input-errorn').classList.remove('formulario__input-error-activo');
        
        campos[variable]=false;}
    
    if(campoAValidar){//se accede a el valor en el input 
        document.getElementById(grupoAValidar).classList.remove('formulario__grupo-incorrecto')

        document.getElementById(grupoAValidar).classList.add('formulario__grupo-correcto')

        document.querySelector('#'+grupoAValidar+' i').classList.add('fa-check-circle');
        document.querySelector('#'+grupoAValidar+' i').classList.remove('fa-times-circle');
        document.querySelector('#'+grupoAValidar+ ' .formulario__input-error').classList.remove('formulario__input-error-activo');
        document.querySelector('#'+grupoAValidar+ ' .formulario__input-errorn').classList.remove('formulario__input-error-activo');
        campos[variable]=true;

    }
}   
function validarInfo2(grupoAValidar,variable)  {
    document.getElementById(grupoAValidar).classList.add('formulario__grupo-incorrecto')

        document.getElementById(grupoAValidar).classList.remove('formulario__grupo-correcto')

        document.querySelector('#'+grupoAValidar+' i').classList.add('fa-times-circle');
        document.querySelector('#'+grupoAValidar+' i').classList.remove('fa-check-circle');
        
        document.querySelector('#'+grupoAValidar+ ' .formulario__input-errorn').classList.add('formulario__input-error-activo');
        document.querySelector('#'+grupoAValidar+ ' .formulario__input-error').classList.remove('formulario__input-error-activo');
        campos[variable]=false;
}




