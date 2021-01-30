import React, {useEffect, useContext, useState} from 'react'
import {useRouter} from 'next/router'
import {FirebaseContext} from '../../firebase'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {Submit, Campo, Error } from '../../components/ui/Formulario'
import Boton from '../../components/ui/Boton'
import Layout from '../../components/layout/Layout'
import Error404 from '../../components/layout/404'
import { set } from 'date-fns'



const ContenedorProducto = styled.div`
    @media (min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;

    }
`;



const ProductPage = ({}) => {

    //State de producto
    const [producto, setProducto] = useState({})
    const [error, setError] = useState(false)
    const [errorVoto, setErrorVoto] = useState(false)
    const [comentario, setComentario] = useState({})
    const [consultarDB, setConsultarDB] = useState(true)

    //Routing para obtener el id
    const router = useRouter()
    const {query: {id}} = router

    //constext de Firebase
    const {firebase, usuario} = useContext(FirebaseContext)

    useEffect(()=>{
        if(id && consultarDB){
            const obtenerProducto = async () => {
                const productoQuery = firebase.db.collection("productos").doc(id)
                const producto = await productoQuery.get()
                if(producto.exists){
                    setConsultarDB(false)
                    setProducto(producto.data())

                }else{
                    setConsultarDB(false)
                    setError(true)
                }
                
            }
            obtenerProducto()
        }

    },[id])

    if(Object.keys(producto).length === 0 && !error) return 'Cargando...'

 
        const {nombre, creado, urlImagen, descripcion, comentarios, url, votos, creador, empresa, haVotado} = producto

    const esCreador = id =>{
        if(creador.id == id){
            return true
        }
    }

    const votarProducto = () =>{
        const votos = [...haVotado]

        if(!usuario) {
            return router.push('/login')
        }
            


        if( votos.includes(usuario.uid)) {
            setErrorVoto(true)
            return
        }
        const nuevoTotal = votos + 1
        const nuevosVotos = [...haVotado, usuario.uid]

        //Actualizar State
        setProducto({
            ...producto,
            votos: nuevoTotal,
           
        })

        //Actualizar BBDD

        firebase.db.collection('productos').doc(id).update({votos: nuevoTotal, haVotado: nuevosVotos})

        consultarDB(true)  //pasa a ser true porque hay un comentario
    }

    const comentarioOnChange = e =>{

        setComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
        
    }

    const submitComentario = e =>{
        e.preventDefault()

        if(!usuario) {
            return router.push('/login')
        }

        comentario.usuarioId = usuario.uid
        comentario.nombre = usuario.displayName 

        const comentariosActualizados = [...comentarios, comentario]

        firebase.db.collection('productos').doc(id).update({comentarios : comentariosActualizados})
        setComentario({})

        setConsultarDB(true)
    }

    // función para comprobar si el creador del producto es el mismo que usuario autenticado


    const puedeBorrar = () =>{
        if(!usuario) return false

        if(usuario.uid === creador.id) return true
    }

    const eliminarProducto = async() =>{

        if(!usuario) {
            return router.push('/login')
        }

        if(creador.id != usuario.uid){
            return router.push('/')
        }

        try {
                    
            await firebase.db.collection('productos').doc(id).delete()
            router.push('/')
            
        } catch (error) {
            console.log(error)
        }

    }

    if(error){
        return(<Error404/>)
    }

    
    return (
        <Layout>
          
            <div className="contenedor">
                <h1 css= {css`
                    text-align: center;
                    margin-top: 5rem;
                `}>
                    {nombre}
                </h1>
                <ContenedorProducto>
                    <div>
                        {creado && <p css={css`
                        font-size: 1.4rem;
                        color: gray`}>Publicado : {formatDistanceToNow(new Date(creado))}</p>}
                        {creador &&  <p css={css`
                        margin-bottom: 4rem;
                        font-size: 1.4rem;
                        color: gray`}>Publicado por: {creador.nombre} de {empresa}</p>}
                        <img src={urlImagen} />
                        <p>{descripcion}</p>
                        {usuario && (
                            <>
                            <h2>Agrega tu comentario</h2>
                        <form onSubmit = {submitComentario}>
                            <Campo>
                                <input type="text" 
                                    name= 'mensaje'
                                    onChange={comentarioOnChange}/>
                            </Campo>
                            <Submit type='submit' value='deja tu comentario'></Submit>
                        </form>
                        <h2>Comentarios</h2>
                            </>
                        )}
                        {comentarios && comentarios.length === 0 ? <p>Aún no hay comentarios</p> : (
                             <ul>
                             {comentarios && comentarios.map((comentario, i) =>(
                                <li key= {`${comentario.usuarioId}-${i}`}>
                                    <p>{comentario.mensaje}</p>
                                    <p css={css`
                                    font-size: 1.3rem;
                                    color:gray;
                                    text-align: right`}>By: {comentario.nombre}{' '}{esCreador(comentario.usuarioId) && <span css={css`color: red`}>Es Creador</span>}</p>
                                    
                                </li>
                             ))}
                             </ul>
                        )}
                       
                       
                    </div>
                    <aside>
                        <Boton
                            target='_blank'
                            bgColor= 'true'
                            href= {url}>Visitar URL</Boton>

                        
                        
                        <div css={css`
                        margin: 5rem`}>
                        {errorVoto && (<Error>Ya has votado por este producto</Error>)}
                        </div>
                        
                        <p css={css`
                            text-align: center;`}>{votos} Votos</p>

                        {usuario && (<Boton onClick= {votarProducto}>Votar</Boton>)}
                            
                    </aside>
                </ContenedorProducto>
                {puedeBorrar() && 
                    <Boton
                        onClick={eliminarProducto}
                    >Eliminar Producto</Boton>}
            </div>
        </Layout>
    )
}

export default ProductPage
