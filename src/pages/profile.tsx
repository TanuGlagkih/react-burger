import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Switch, useHistory } from 'react-router-dom'
import { ProtectedRoute } from '../components/protected-route/protected-route';
import { logOut, getUserData, updateUserData } from '../services/actions/requests';
import { getCookie } from '../services/utils';
import { IFormState } from '../utils/types';
import styles from './pages.module.css'

export function ProfilePage() {
    return (
        <div className={styles.profile}>
            <NavBar />
            <Switch>
                <ProtectedRoute path='/profile' exact>
                    <Profile />
                </ProtectedRoute>
                <ProtectedRoute path='/profile/orders' exact>
                    <Orders />
                </ProtectedRoute>
            </Switch>
        </div>
    )
}

function NavBar() {
    const dispatch = useDispatch();
    const token = getCookie('refreshToken');
    const history = useHistory();

    const logout = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            //@ts-ignore
            dispatch(logOut());
            if (!token) {
                history.push('/login')
            }
        },
        []);

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
            <p className="text text_type_main-default text_color_inactive mt-20"> В этом разделе вы можете изменить <br /> свои персональные данные</p>
        </div>
    )
}

function Profile() {
    const [form, setValue] = useState<IFormState>({ name: '', email: '', password: '' });
    //@ts-ignore
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
            //@ts-ignore
            dispatch(updateUserData(form));
            setBtnsVisible(false)
        }, [])

    useEffect(() => {
        //@ts-ignore
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

function Orders() {
    return (
        <div className={styles.box}>

        </div>
    )
}
