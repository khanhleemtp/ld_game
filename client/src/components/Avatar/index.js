import React from 'react'
import { AvatarImg, AvatarWrapper } from './styles'
export default function Avatar({ src }) {
    return (
        <AvatarWrapper>
            <AvatarImg src={src} />
        </AvatarWrapper>
    )
}
