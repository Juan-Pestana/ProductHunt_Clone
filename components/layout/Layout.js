import React from 'react'
import Head from 'next/head'
import Header from './Header'

 const Layout = props => {
    return (
    <>
        <Head>
            
            <title> Product Hunt Next y Firbase </title>
        </Head>
        <Header/>

        <main>
            {props.children}
        </main>
    </>
    )
}

export default Layout
