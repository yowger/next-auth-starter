import React, { ReactNode } from "react"

interface Props {
    children: ReactNode
}

export default function layout({ children }: Props) {
    return (
        <div className="flex-grow-1 flex-grow justify-center items-center flex">
            {children}
        </div>
    )
}
