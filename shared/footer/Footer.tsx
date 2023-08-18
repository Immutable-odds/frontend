import { Logo } from '@/shared'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_body}>
        <div className={`${styles.footer_logo} ${styles.footer_logo_noMob}`}>
          <Logo type="footer" />
        </div>
        <div className={styles.title}>
          <h1>
            Do you have a question, an idea, or a project you need help with? Contact us! <a href="#">drop us a line</a>
            .
          </h1>
        </div>
      </div>
      <div className={styles.footer_divider}></div>
      <div className={styles.footer_footer}>
        <div className={styles.footer_address}>
          <p>Info@buttonslab.com</p>
          <p>61 Bridge Street, Kington,</p>
          <p>United Kingdom</p>
        </div>
        <ul className={styles.footer_nav}>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Linkedin
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Dribbble
            </a>
          </li>
        </ul>
        <div className={styles.footer_copyWrite}>
          <p>Buttons Lab &copy; 2023</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
