import {useState} from 'react'
import Router from 'next/router'

import {css} from '@emotion/react'

import Layout from '../components/layout/Layout'
import {Formulario, Campo, Submit, Error} from '../components/ui/Formulario'

import firebase from '../firebase'


//validaciones
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearCuenta'

const STATE_INICIAL = {

  nombre: '',
  email: '',
  password: ''

}

const CrearCuenta = () => {

  const [error, setError] = useState(false)


  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta )

  const{ nombre, email, password} = valores

  async function crearCuenta() {
    
    try {

      await firebase.registrar(nombre, email, password)
      Router.push("/")

    } catch (error) {

      console.log('Hubo un error al crear la cuenta', error)
      // errores.crearUsuario = error.message
      setError(error.message)
      setTimeout(()=>setError(false), 3000)
    }
    
  }

  return (
    <div >
      <Layout>

        <h1 css={css`
          text-align: center;
          margin-top: 5rem`}>Crear Cuenta</h1>

          
        
        <Formulario
          onSubmit= {handleSubmit}>
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
            <label htmlFor="email">Email</label>
            <input type="email"
              id='email'
              placeholder='Tu email'
              name='email'
              value = {email}
              onChange= {handleChange}
              />
          </Campo>
          {errores.email && <Error>{errores.email}</Error>}
          <Campo>
            <label htmlFor="contraseña">Password</label>
            <input type="password"
              id='pasword'
              placeholder='Tu Password'
              name='password'
              value= {password}
              onChange= {handleChange}
              />
          </Campo>
          {errores.password && <Error>{errores.password}</Error>}
          {error && <Error>{error}</Error>}
          <Submit type="submit"
              value = 'Crear Cuenta'/>
        </Formulario>

      </Layout>
      
    </div>
  )


}


export default CrearCuenta