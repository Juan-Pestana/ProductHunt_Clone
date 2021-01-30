import React from 'react'
import {css} from '@emotion/react'

const Error404 = () => {
    return (
        <div>
            <h1
                css={css`
                margin-top: 5rem;
                text-align: center;
                `}
            >No existe ese producto</h1>
        </div>
    )
}

export default Error404
