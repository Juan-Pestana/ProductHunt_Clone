import {useState, useContext} from 'react'
import Router, {useRouter} from 'next/router'

import {css} from '@emotion/react'

import Layout from '../components/layout/Layout'
import {Formulario, Campo, Submit, Error} from '../components/ui/Formulario'
import {uuid} from 'uuidv4'
import {FirebaseContext} from '../firebase'


//validaciones
import useValidacion from '../hooks/useValidacion'
import validarCrearProducto from '../validacion/validarCrearProducto'

const STATE_INICIAL = {

  nombre: '',
  empresa: '',
  imagen: '',
  url: '',
  descripcion: '',

}
const NuevoProducto = () => {

  const [nombreImagen, guardarNombre] = useState('')
  const [subiendo, guardarSubiendo] = useState(false)
  const [error, setError] = useState(false)
  const [progreso, guardarProgreso] = useState(0)
  const [urlImagen, guardarUrlImagen] = useState('')


  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto )

  const{ nombre, empresa, imagen, url, descripcion} = valores

  // hook de routing para redireccionar
  const router = useRouter()

  // context con el CRUD de firebase

  const {usuario, firebase} = useContext(FirebaseContext)

 

  async function crearProducto() {

  // si el usuario no ha iniciado sesión llevar a login
    if(!usuario){
      return router.push('/login')
    }

    //crear objeto de producto

    const producto = {
      nombre,
      empresa,
      url,
      urlImagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
      haVotado: [],


    }

    firebase.db.collection('productos').add(producto);

    return router.push('/');

  }




 
  const onChange = async (e) => {

      const file = e.target.files[0]; // acceder al file subido con el input

      // asignar donde se guardara el file  
      const storageRef = await firebase.storage.ref("productos");

      // asignar el nombre del archivo en el storage de firebase
      const fileRef = storageRef.child(uuid());
        
      await fileRef.put(file); // termina de agregar el archivo

      guardarUrlImagen(await fileRef.getDownloadURL()); // add urlFile al state

  /* getDownloadURL() - permite extraer url del file subido,
  sirve tanto con await y .then */
  }


// Asi debe estar el input tipo file 

 


  return (
    <div >
      <Layout>

        <h1 css={css`
          text-align: center;
          margin-top: 5rem`}>Nuevo Producto</h1>
        <Formulario
          onSubmit= {handleSubmit}>
          <fieldset>
            <legend>Información General</legend>
            
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input type="text"
                id='nombre'
                placeholder='Tu Nombre'
                name='nombre'
                value ={nombre}
                onChange= {handleChange}
                />
            </Campo>
            {errores.nombre && <Error>{errores.nombre}</Error>}
            <Campo>
              <label htmlFor="empresa">Empresa</label>
              <input type="text"
                id='empresa'
                placeholder='Nombre Empresa'
                name='empresa'
                value ={empresa}
                onChange= {handleChange}
                />
            </Campo>
            {errores.empresa && <Error>{errores.empresa}</Error>}
            <Campo>
                    <label htmlFor="imagen">Imagen</label>
                    <input
                    accept="image/*"
                    onChange={onChange}
                    type="file"
                    id="image"
                    name="image"
                    />
                </Campo>

            <Campo>
              <label htmlFor="url">Url</label>
              <input type="url"
                placeholder='URL de Producto'
                id='url'
                name='url'
                value ={url}
                onChange= {handleChange}
                />
            </Campo>
            {errores.url && <Error>{errores.url}</Error>}


          </fieldset>
          <fieldset>
            <legend>Sobre tu Producto</legend>
            <Campo>
              <label htmlFor="descripcion">Descripción</label>
              <textarea

                id='descripcion'
                name='descripcion'
                value ={descripcion}
                onChange= {handleChange}
                />
            </Campo>
            {errores.descripcion && <Error>{errores.descripcion}</Error>}


          </fieldset>
        
        


          {error && <Error>{error}</Error>}
          <Submit type="submit"
              value = 'Crear Producto'/>
        </Formulario>

      </Layout>
      
    </div>
  )


}

export default NuevoProducto
