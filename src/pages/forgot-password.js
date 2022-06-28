import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { getUserData } from '../services/actions/requests';
import { baseUrl, checkResponse } from '../services/API';
import styles from './pages.module.css'

export function ForgotPasswordPage() {
  const [form, setValue] = useState('');
  const { isAuth } = useSelector(state => state.requests)
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()

  const onChange = e => {
    setValue(e.target.value);
  };

  useEffect(() => {
    dispatch(getUserData())
  }, [])

  let onClick = useCallback(
   async e => {
      e.preventDefault();
      if(!form){
        return
      }
      fetch(`${baseUrl}/password-reset`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: form,
        }),
    })
        .then(checkResponse)
        .then((res) => {
            if (res && res.success && res.message == "Reset email sent") {
              history.push('/reset-password', location.pathname)
            } else {
                console.log('failed')
            }
        }).catch(err => console.log('failed'))
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
      <form className={styles.form}>
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <div className='mb-6'>
          <EmailInput placeholder={'Email'} onChange={onChange} value={form} name={'email'} />
        </div>
        <div className='mb-20'>
          <Button type="primary" size="large" htmlType='submit' onClick={onClick} >
            Восстановить
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></p>
      </form>
    </div>
  )
}