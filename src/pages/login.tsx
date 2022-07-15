import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { getUserData, logIn } from '../services/actions/requests';
import styles from './pages.module.css';
import { Location } from 'history';
import { IFormState } from '../utils/types';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
  const [form, setValue] = useState<IFormState>({ email: '', password: '' });
  const dispatch = useDispatch();
  //@ts-ignore
  const { isAuth } = useSelector(state => state.requests);
  const location = useLocation<{from: Location}>();

  const onChange = (e: React.ChangeEvent) => {
    setValue({ ...form, [(e.target as HTMLFormElement).name]: (e.target as HTMLFormElement).value });
  };

  useEffect(() => {
    //@ts-ignore
    dispatch(getUserData())
  }, [isAuth])

  let login = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      //@ts-ignore
      dispatch(logIn(form));
    },
    [form]
    )

  if (isAuth) {
    return (
      <Redirect
      to={ location.state?.from || '/' }
      />
    );
  }

  return (
    <div className={styles.box}>
      <form className={styles.form} onSubmit={login}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <div className='mb-6'>
          <Input placeholder={'Email'} onChange={onChange} value={form.email || ''} name={'email'}/>
        </div>
        <div className='mb-6'>
          <Input placeholder={'Пароль'} onChange={onChange} value={form.password || ''} name={'password'} icon={'ShowIcon'} />
        </div>
        <div className='mb-20'>
          <Button type="primary" size="large" htmlType='submit' >
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mb-4">Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
      </form>
    </div>
  )
}