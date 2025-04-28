import { Link } from "react-router-dom"
import cl from "./CommonLink.module.css"

const CommonLink = ({ to, children: text }) => (
    <Link to={to} className={cl.link}>{text}</Link>
)

export default CommonLink