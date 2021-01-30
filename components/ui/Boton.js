import styled from '@emotion/styled'

const Boton = styled.a`
    font-weight: 700;
    display: block;
    text-align: center;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin-right: 1rem;
    background-color: ${props => props.bgColor ?  '#da552f' : 'white'  };
    color: ${props => props.bgColor ? 'white' : '#000'};

    &:last-child{
        margin-right: 0;
    }
    &:hover{
        cursor: pointer;
        margin-bottom: 2px;
    }
`;

export default Boton;
