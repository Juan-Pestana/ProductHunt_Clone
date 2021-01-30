import {useState} from 'react'
import Router from 'next/router'

import {css} from '@emotion/react'

import Layout from '../components/layout/Layout'
import {Formulario, Campo, Submit, Error} from '../components/ui/Formulario'

import firebase from '../firebase'


//validaciones
import useValidacion from '../hooks/useValidacion'
import validarIniciarSesion from '../validacion/validarIniciarSesion'
import firebaseConfig from '../firebase/config'

const STATE_INICIAL = {

  email: '',
  password: ''

}

export default function Login() {


  const [error, setError] = useState(false)


  const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion  )

  const{ email, password} = valores

  async function iniciarSesion() {
    
    try {
      await firebase.login(email, password)
      Router.push('/')
    } catch (error) {
      console.log('hubo un error al iniciar sesión', error)
      setError(error.message)
    }
    
  }


  return (
    <div >
      <Layout>

        <h1 css={css`
          text-align: center;
          margin-top: 5rem`}>Login Usuario</h1>

          
        
        <Formulario
          onSubmit= {handleSubmit}>

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
              value = 'Login'/>
        </Formulario>

      </Layout>
      
    </div>
  )
}
