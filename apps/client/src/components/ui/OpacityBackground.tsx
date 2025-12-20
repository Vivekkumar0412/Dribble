'use client'
import React from "react"
import { createPortal } from "react-dom"

interface OpacityBackgroundProps {
    children: React.ReactNode,
    onBgClick?: () => void
}

export default function OpacityBackground({children, onBgClick}: OpacityBackgroundProps) {
    return createPortal(
        <div onClick={onBgClick} className="fixed inset-0 h-screen w-screen backdrop-blur-xs z-50 flex items-center justify-center">
            {children}
        </div>,
        document.body
    )
}