import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { NavLink, Switch, useHistory, useLocation } from 'react-router-dom'
import { Feed } from '../components/feed/feed';
import { ProtectedRoute } from '../components/protected-route/protected-route';
import { logOut, getUserData, updateUserData } from '../services/actions/requests';
import { useDispatch, useSelector } from '../services/types';
import { getCookie } from '../services/utils';
import { IFormState } from '../utils/types';
import { FeedDetails } from './feed-details';
import styles from './pages.module.css'

export function ProfilePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'WS_CONNECTION_START_PROTECTED' })
    }, [])

    return (
        <>
            <Switch>
                <ProtectedRoute path='/profile' exact>
                    <div className={styles.profile}>
                        <NavBar />
                        <Profile />
                    </div>
                </ProtectedRoute>
                <ProtectedRoute path='/profile/orders' exact>
                    <div className={styles.profile}>
                        <NavBar />
                        <Orders />
                    </div>
                </ProtectedRoute>
                <ProtectedRoute path='/profile/orders/:id'>
                    <FeedDetails modal={false} />
                </ProtectedRoute>
            </Switch>
        </>
    )
}

export function NavBar() {
    const dispatch = useDispatch();
    const token = getCookie('refreshToken');
    const history = useHistory();
    const location = useLocation()

    const logout = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            dispatch(logOut());
            if (!token) {
                history.push('/login')
            }
        },
        []);

    const textContent = location.pathname === '/profile/orders' ?
        <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете посмотреть <br /> свою историю заказов</p>
        :
        <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить <br /> свои персональные данные</p>

    return (
        <div className={styles.bar}>
            <NavLink to='/profile' className={`${styles.link} text text_type_main-medium text_color_inactive mb-8 `} activeClassName={styles.active}>
                Профиль
            </NavLink>
            <NavLink to='/profile/orders' className={`${styles.link} text text_type_main-medium text_color_inactive  mb-8 `} activeClassName={styles.active}>
                История заказов
            </NavLink >
            <a onClick={logout} className={`${styles.a} text text_type_main-medium text_color_inactive mb-8 `} >
                Выход
            </a>
            {textContent}
        </div>
    )
}

export function Profile() {
    const [form, setValue] = useState<IFormState>({ name: '', email: '', password: '' });
    const { email, name } = useSelector(state => state.requests);
    const dispatch = useDispatch();
    const [isBtnsVisible, setBtnsVisible] = useState(false)

    const onChange = (e: React.ChangeEvent) => {
        setValue({ ...form, [(e.target as HTMLFormElement).name]: (e.target as HTMLFormElement).value });
        setBtnsVisible(true)
    };

    const cancel = () => {
        setBtnsVisible(false);
        setValue({ name: name, email: email })
    }

    const change = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            dispatch(updateUserData(form));
            setBtnsVisible(false)
        }, [])

    useEffect(() => {
        dispatch(getUserData());
    }, [])

    useEffect(() => {
        setValue({ name: name, email: email })
    }, [email, name])

    return (
        <div className={styles.box}>
            <form className={styles.form} onSubmit={change}>
                <div className='mb-6'>
                    <Input placeholder={'Имя'} onChange={onChange} value={form.name || ''} name={'name'} icon={'EditIcon'} />
                </div>
                <div className='mb-6'>
                    <Input placeholder={'Логин'} onChange={onChange} value={form.email || ''} name={'email'} />
                </div>
                <div className='mb-6'>
                    <Input placeholder={'Пароль'} onChange={onChange} value={form.password || ''} name={'password'} icon={'EditIcon'} />
                </div>
                <div className='mb-20'>
                    {isBtnsVisible ? (
                        <>
                            <Button type='secondary' size="large" htmlType='submit' onClick={cancel} >
                                Отмена
                            </Button>
                            <Button type="primary" size="large" htmlType='submit'>
                                Сохранить
                            </Button>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </form>
        </div>
    )
}

export function Orders() {
    return (
        <div className={styles.box}>
            <Feed />
        </div>
    )
}
