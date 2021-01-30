import Layout from '../components/layout/Layout'
import {useRouter} from 'next/router'
import Producto from '../components/layout/Producto'
import useProductos from '../hooks/useProductos'
import { useEffect, useState } from 'react'

export default function Buscar() {

  const [resultado, setResultado] = useState([])

  const router = useRouter()
  const {query: {q}} = router

  // todos los productos

  const {productos} = useProductos('creado')

  useEffect(()=>{

    const busqueda = q.toLowerCase()
    const filtro = productos.filter(producto =>{
      return (
        producto.nombre.toLowerCase().includes(busqueda) || 
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    })

    setResultado(filtro)

  },[q, productos])

  return (
    <div >
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
              {resultado.map(producto =>(
              <Producto 
                key={producto.id} 
                producto={producto}
                />
              ))}
            </ul>
          </div>
        </div>

      </Layout>
      
      
    </div>
  )
}
