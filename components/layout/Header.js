import React, { useContext } from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import {css} from '@emotion/react'

import {FirebaseContext} from '../../firebase'

import Buscar from '../ui/Buscar'
import Nav from './Nav'

import Boton from '../ui/Boton'

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
    `;

const Logo = styled.a`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 1;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
    cursor: pointer;
`;

const Header = () => {

    const {usuario, firebase} = useContext(FirebaseContext)

    // console.log('el usuario en el header es', usuario)

    return (
        <header
            css={css`
                border-bottom: 2px solid #e1e1e1;
                padding: 1rem 0;
                `}
                >
            <ContenedorHeader>
                <div css= {css`
                    display: flex;
                    align-items: center;`}>
                    <Link href='/'>
                        <Logo>P</Logo>
                    </Link>
                    <Buscar/>

                    <Nav/>
                </div>
                <div css= {css`
                    display: flex;
                    align-items: center;`}>
                    {usuario ? (<>
                    <p css={css`
                        margin-right: 2rem;`}>Hola: {usuario.displayName}</p>
                    <Boton bgColor='true'
                        onClick={()=> firebase.signOut()}>cerrar sesion</Boton>

                    </>) : (<>
                    <Link href='/login'>
                        <Boton bgColor= 'true'>Login</Boton> 
                     </Link>
                     <Link href='/crear-cuenta'>
                        <Boton>Crear Cuenta</Boton>
                     </Link>
                </>)}
                

                </div>
            </ContenedorHeader>
        </header>
    )
}

export default Header
