import styles from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from '../components/appNav_component/AppNav'
import Footer from './footer_component/Footer'
import { Outlet } from 'react-router'

function SideBar() {
    return (
        <div className={styles.sidebar}> 
        <Logo/>
        <AppNav/>
        <Outlet/>

      <Footer/>
        </div>
    )
}

export default SideBar
