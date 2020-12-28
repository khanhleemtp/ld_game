import React from 'react'
import { BackgroundWrapper } from './styles'
export default function BackgroundImg({ bgSrc, bgColor, bgDesColor }) {
    return (
        <BackgroundWrapper
            bgSrc={bgSrc}
            bgColor={bgColor}
            bgDesColor={bgDesColor}
        />
    )
}
