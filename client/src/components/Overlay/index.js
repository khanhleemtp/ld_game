import React from 'react'
import { OverlayWrapper } from './styles'
export default function Overlay({ isOpenPopup }) {
    console.log(isOpenPopup);
    return (
        <OverlayWrapper
            isOpenPopup={isOpenPopup}
        />
    )
}
