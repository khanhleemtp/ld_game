import React from 'react'
import { InputWrapper, InputLabel, InputText } from './styles'
export default function InputContainer({ placeholder, label, setResource }) {
    return (
        <InputWrapper>
            <InputLabel>{label}</InputLabel>
            <InputText 
                placeholder={placeholder}
                onChange={ e => setResource(e.target.value)}
                />
        </InputWrapper>
    )
}
