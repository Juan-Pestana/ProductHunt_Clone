import React, {useState, useEffect, useContext} from 'react';

import {FirebaseContext} from '../firebase'


const useProductos = orden =>{

    const [productos, setProductos] = useState([])

    const {firebase} = useContext(FirebaseContext)
  
  
    useEffect(()=>{
      const fetchProducts = () =>{
        firebase.db.collection('productos').orderBy( orden , 'desc').onSnapshot(manageSnapshots)
      }
      fetchProducts()
    },[])
  
    function manageSnapshots(snapShot) {
      const products = snapShot.docs.map(doc =>{
        return {
          id: doc.id,
          ...doc.data()
        }
      })
  
      setProductos(products)
    }

    return {
        productos
    }
}

export default useProductos