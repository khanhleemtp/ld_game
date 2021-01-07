import React from 'react'
import { ButtonWrapper, ButtonIcon, ButtonText } from './styles'

export const Button = ({ bgColor, iconSrc, text, alt, textColor, disabled, onClick }) => {
    return (
        <ButtonWrapper 
            type="submit"
            disabled={disabled ? true : false}
            bgColor={bgColor}
            isStart={disabled}
            onClick={onClick}
            >
            {
                iconSrc ? 
                    <ButtonIcon 
                        src={iconSrc}
                        alt={alt} />
                    : null
            }
            <ButtonText textColor={textColor}>
                {text}
            </ButtonText>
        </ButtonWrapper>
    )
}
