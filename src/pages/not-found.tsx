import React from 'react';
import { Link } from 'react-router-dom';

import styles from './pages.module.css';

export const NotFound404 = () => {
    return (
        <div className={styles.not_found}>
            <p className="text text_type_digits-large">404</p>
            <p className="text text_type_main-large"> Такой страницы не существует </p>
            <Link to='/' className="text text_type_main-medium text_color_inactive mt-10">Перейти на главную</Link>
        </div>
    );
}; 