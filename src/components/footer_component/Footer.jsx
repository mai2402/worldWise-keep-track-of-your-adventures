import styles from "../footer_component/Footer.module.css"

function Footer() {
    return (
        <footer className={styles.footer}> 
            <p className={styles.copyright}>
                &copy; copyright {new Date().getFullYear()} by 
                WorldWise Inc.
            </p>
        </footer>
    )
}

export default Footer
