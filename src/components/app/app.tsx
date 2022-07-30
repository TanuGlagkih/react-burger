import AppHeader from '../app-header/app-header';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { HomePage } from '../../pages/home';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import IngredientDetails from '../ingredient-detales/ingredient-details';
import { ProfilePage } from '../../pages/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { ResetPasswordPage } from '../../pages/reset-password';
import { NotFound404 } from '../../pages/not-found';
import Modal from '../modal/modal';
import { useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/burger-ingredients';
import { Location } from 'history';
import { FeedPage } from '../../pages/feed';
import { FeedDetails } from '../../pages/feed-details';

function App() {
  const dispatch = useDispatch();
  const [active, setActive] = useState<boolean>(false);
  const location = useLocation<{ background: Location }>();

  useEffect(() => {
    dispatch(getItems())
  }, [])

  useEffect(() => {
    dispatch({ type: 'WS_CONNECTION_START' })
  }, [])

  const background = location.state && location.state.background;

  useEffect(() => {
    if (location.state && location.state.background) {
      setActive(true)
    }
  }, [background])

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset-password'>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path='/profile'>
          <ProfilePage />
        </ProtectedRoute>
        <Route path='/ingredients/:id'>
          <IngredientDetails modal={false} />
        </Route>
        <Route path='/feed/:id'>
          <FeedDetails modal={false} />
        </Route>
        <Route path='/feed' >
          <FeedPage />
        </Route>
        <Route path='/' exact={true}>
          <HomePage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && <Route path="/ingredients/:id" >
        <Modal active={active} setActive={setActive} back={true}>
          <IngredientDetails modal={true} />
        </Modal>
      </Route>}
      {background && <Route path="/feed/:id" >
        <Modal active={active} setActive={setActive} back={true}>
          <FeedDetails modal={true} />
        </Modal>
      </Route>}
      {background && <ProtectedRoute path="/profile/orders/:id" >
        <Modal active={active} setActive={setActive} back={true}>
          <FeedDetails modal={true} />
        </Modal>
      </ProtectedRoute>}
    </>
  );
}

export default App;
