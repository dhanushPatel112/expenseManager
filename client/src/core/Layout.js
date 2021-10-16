import React from "react"
import Menu from "./Menu"
import './style.css';


const Layout = ({
    className,
    children,
}) => {
    const footer = () => (
        <footer className='footer d-flex flex-column flex-md-row align-items-center justify-content-between' id='footer'>
            <p className='text-muted text-center text-md-left'>
                Copyright © 2021{" "}
                . All rights reserved
            </p>
        </footer>
    )
    return (
        <div>
            <Menu />
            <div className={className}>{children}</div>
            {footer()}
        </div>
    )
}

export default Layout
