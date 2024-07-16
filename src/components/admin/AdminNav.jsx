'use client'

import { useEffect , useState } from "react"

const AdminNav = ({viewNav}) => {

    useEffect(() => {
        viewNav('contact')
    }, [])


    return (
        <div>
            this is admin nav
        </div>
    )
}

export default AdminNav