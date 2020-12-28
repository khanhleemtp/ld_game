import React from 'react'
import { LogoWrapper, LogoImg } from './styles'
export default function Logo({ alt, src }) {
    return (
        <>
            <LogoWrapper>
                <LogoImg alt={alt} src={src}/>
            </LogoWrapper>
        </>
    )
}
