import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getUserData, register } from '../services/actions/requests';
import { IFormState } from '../utils/types';
import styles from './pages.module.css'

export function RegisterPage() {
    const [form, setValue] = useState<IFormState>({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    //@ts-ignore
    const { isAuth } = useSelector(state => state.requests)

    const onChange = (e: React.ChangeEvent) => {
        setValue({ ...form, [(e.target as HTMLFormElement).name]: (e.target as HTMLFormElement).value });
    };

    useEffect(() => {
        //@ts-ignore
        dispatch(getUserData())
    }, [])

    let onClick = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            //@ts-ignore
            dispatch(register(form));
        },
        [form]
    );

    if (isAuth) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    return (
        <div className={styles.box}>
            <form className={styles.form} onSubmit={onClick}>
                <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                <div className='mb-6'>
                    <Input placeholder={'Имя'} onChange={onChange} value={form.name || ''} name={'name'} />
                </div>
                <div className='mb-6'>
                    <Input placeholder={'Email'} onChange={onChange} value={form.email || ''} name={'email'} />
                </div>
                <div className='mb-6'>
                    <Input placeholder={'Пароль'} onChange={onChange} value={form.password || ''} name={'password'} icon={'ShowIcon'} />
                </div>
                <div className='mb-20'>
                    <Button type="primary" size="large" htmlType='submit' >
                        Зарегистрироваться
                    </Button>
                </div>
                <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></p>
            </form>
        </div>
    )
}