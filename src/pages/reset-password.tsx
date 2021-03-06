import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { getUserData } from '../services/actions/requests';
import { baseUrl, checkResponse } from '../services/API';
import { TResetResponse } from '../utils/types';
import styles from './pages.module.css';

type TResetPasswordState = {
  password: string;
  token: string;
  name: string;
}

export function ResetPasswordPage() {
  const [form, setValue] = useState<TResetPasswordState>({ password: '', token: '', name: '' });
  //@ts-ignore
  const { isAuth } = useSelector(state => state.requests)
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<string>()

  const onChange = (e: React.ChangeEvent) => {
    setValue({ ...form, [(e.target as HTMLFormElement).name]: (e.target as HTMLFormElement).value });
  };

  let onClick = useCallback(
    async (e: React.FormEvent): Promise<TResetResponse | void> => {
      e.preventDefault();
      if (!form.password || !form.password) {
        return
      }

      fetch(`${baseUrl}/password-reset/reset`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          password: form.password,
          token: form.token
        }),
      })
        .then(checkResponse<TResetResponse>)
        .then((res) => {
          if (res && res.success && res.message == "Password successfully reset") {
            history.push('/login')
          } else {
            console.log('failed')
          }
        }).catch(err => console.log('failed'))
    },
    [form]
  );

  useEffect(() => {
    //@ts-ignore
    dispatch(getUserData())
  }, [])

  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }
   if (location.state !== '/forgot-password') {
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
        <h1 className="text text_type_main-medium mb-6">???????????????????????????? ????????????</h1>
        <div className='mb-6'>
          <Input placeholder={'?????????????? ?????????? ????????????'} onChange={onChange} value={form.password} name={'password'} icon={'ShowIcon'} />
        </div>
        <div className='mb-6'>
          <Input placeholder={'?????????????? ?????? ???? ????????????'} onChange={onChange} value={form.name} name={'token'} />
        </div>
        <div className='mb-20'>
          <Button type="primary" size="large" htmlType='submit'>
            ??????????????????
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">?????????????????? ????????????? <Link to='/login'>??????????</Link></p>
      </form>
    </div>
  )
}