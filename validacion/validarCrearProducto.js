
export default function validarCrearProducto(valores) {

    let errores = {}

    //validar nombre
    if(!valores.nombre){
        errores.nombre = "El nombre es obligatorio";

    }

    //validar empresa

    if(!valores.empresa){
        errores.empresa = "Nombre de empresa es obligatorio"
    }

    //validar url
    if(!valores.url){
        errores.url = "La Url del producto es obligatoria"
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "URL no valida"
    }

    if(!valores.descripcion){
        errores.descripcion = "Agrega una descripción"

    }


    

    return errores
}