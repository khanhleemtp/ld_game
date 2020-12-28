import React from 'react'
import { InputWrapper, InputLabel, InputText } from './styles'
export default function InputContainer({ placeholder, label }) {
    return (
        <InputWrapper>
            <InputLabel>{label}</InputLabel>
            <InputText placeholder={placeholder}/>
        </InputWrapper>
    )
}
