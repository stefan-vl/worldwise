import styles from "./Sidebar.module.css"
import Logo from "./Logo.jsx";
import {AppNav} from "./AppNav.jsx";
import {Outlet} from "react-router-dom";

export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo/>
            <AppNav/>
            <Outlet/>
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()} by WorldWise
                </p>
            </footer>
        </div>
    )
}

export default Sidebar