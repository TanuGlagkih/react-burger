import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { getUserData, logIn } from '../services/actions/requests';
import styles from './pages.module.css'

export function LoginPage() {
  const [form, setValue] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.requests);
  const location = useLocation();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getUserData())
  }, [isAuth])

  let login = useCallback(
    e => {
      e.preventDefault();
      dispatch(logIn(form));
    })

  if (isAuth) {
    return (
      <Redirect
      to={ location.state?.from || '/' }
      />
    );
  }

  return (
    <div className={styles.box}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <div className='mb-6'>
          <EmailInput placeholder={'Email'} onChange={onChange} value={form.email} name={'email'}/>
        </div>
        <div className='mb-6'>
          <PasswordInput placeholder={'Пароль'} onChange={onChange} value={form.password} name={'password'} className='mb-6' icon={'ShowIcon'} />
        </div>
        <div className='mb-20'>
          <Button type="primary" size="large" htmlType='submit' onClick={login} >
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mb-4">Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
      </form>
    </div>
  )
}