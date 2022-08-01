import React from 'react'
import { NavLink, Link } from 'react-router-dom'
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
            <NavLink to='/' className={`${styles.main_link} text text_type_main-default text_color_inactive`} activeClassName={styles.active}>
              Конструктор
            </NavLink>
          </div>

          <div className={styles.elem}>
            <div className={styles.icon}>
              <ListIcon type="secondary" />
            </div>
            <NavLink to='/feed' className={`${styles.link} text text_type_main-default text_color_inactive`} activeClassName={styles.active}>
              Лента заказов
            </NavLink>
          </div>
        </section>

        <section className={styles.logo}>
          <Link to='/'>
            <Logo />
          </Link>
        </section>

        <section>
          <section className={styles.elem}>
            <div className={styles.icon}>
              <ProfileIcon type="secondary" />
            </div>
            <NavLink to='/profile' className={`${styles.link} text text_type_main-default text_color_inactive`} activeClassName={styles.active}>
              Личный кабинет
            </NavLink>
          </section>
        </section>
      </nav>
    </header>
  )
}

export default AppHeader;






