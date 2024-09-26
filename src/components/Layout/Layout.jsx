import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>Navbar
            <main>
                <Outlet/>
            </main>
            <div style={{background: "red"}}>Index</div>
        </div>
    )
}

export default Layout