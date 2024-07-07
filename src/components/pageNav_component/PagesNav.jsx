import { NavLink } from "react-router-dom"
import Logo from "../Logo"
import styles from "../pageNav_component/PageNav.module.css"

function PagesNav() {
    return (
        <nav className={styles.nav}>  
          <Logo/>
          <ul>
            <li>
                <NavLink to='/pricing'>pricing</NavLink>
            </li>
            <li>
                <NavLink to='/product'>product</NavLink>
            </li>
            <li>
                <NavLink to='/login' className={styles.ctaLink}>LOGIN</NavLink>
            </li>
            </ul>  
        </nav>
    )
}

export default PagesNav
