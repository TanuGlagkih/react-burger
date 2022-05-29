import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

const AppHeader = () => {
  return (
    <header className="App-header">
      <nav className={styles.header}>

        <section>
          <div className={styles.elem}>
            <div className={styles.icon}>
              <BurgerIcon type="primary" />
            </div>
            <p className="text text_type_main-default">Конструктор</p>
          </div>

          <div className={styles.elem}>
            <div className={styles.icon}>
              <ListIcon type="secondary" />
            </div>
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
          </div>
        </section>

        <section className={styles.logo}>
          <Logo />
        </section>

        <section>
          <section className={styles.elem}>
            <div className={styles.icon}>
              <ProfileIcon type="secondary" />
            </div>
            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
          </section>
        </section>
      </nav>
    </header>
  )
}

export default AppHeader;






