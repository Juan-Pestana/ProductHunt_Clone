import React, { useContext } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import {FirebaseContext} from '../../firebase'

const Navi = styled.nav`
    padding-left: 2rem;

    a{
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;

        &:last-child{
            margin-right: 0
        }
    }
`;

const Nav = () => {
    const {usuario} =useContext(FirebaseContext)
    return (
        <Navi>
            <Link href='/'><a>Inicio</a></Link>
            <Link href='/populares'><a>Populares</a></Link>
            {usuario && (<Link href='/nuevo-producto'><a>Nuevo Producto</a></Link>)}
        </Navi>
    )
}

export default Nav
