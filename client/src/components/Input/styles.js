import styled from 'styled-components'

export const InputWrapper = styled.div`
    color: #797979;
    margin: 12px 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
`

export const InputLabel = styled.div`
    width: 100%;
    text-transform: uppercase;
    font-size: 16px;
`

export const InputText = styled.input`
    width: 100%;
    outline: none;
    height: initial;
    padding: 3px 0 4px;
    border: none;
    border-bottom: 1px #707b92 solid;
    &::placeholder {
        color: #777b92;
        font-weight: 600;
    }
    &:focus{
        &::placeholder{
            color: #171717;
        }
    }
`