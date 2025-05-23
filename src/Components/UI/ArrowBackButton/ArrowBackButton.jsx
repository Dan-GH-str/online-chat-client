import React from 'react'
import { Link } from 'react-router-dom'
import cl from "./ArrowBackButton.module.css"

const ArrowBackButton = ({ to, title="", className }) => {
  return (
    <Link to={to} className={`btn btn-outline-secondary ${className || ''}`} title={title}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className={`${cl.svg} bi bi-arrow-left`} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
        </svg>
    </Link>
  )
}

export default ArrowBackButton