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
            <p className='text-muted text-center text-md-left mb-0 d-none d-md-block'>
                Handcrafted With{" "}
                <i
                    className='mb-1 text-primary ml-1 icon-small'
                    data-feather='heart'
                ></i>
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
