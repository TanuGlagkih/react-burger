import AppHeader from '../app-header/app-header.js';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/login.js';
import { RegisterPage } from '../../pages/register.js';
import { HomePage } from '../../pages/home.js';
import { ForgotPasswordPage } from '../../pages/forgot-password.js';
import IngredientDetails from '../ingredient-detales/ingredient-details.js';
import { ProfilePage } from '../../pages/profile.js';
import { ProtectedRoute } from '../protected-route/protected-route.js';
import { ResetPasswordPage } from '../../pages/reset-password.js';
import { NotFound404 } from '../../pages/not-found.js';
import Modal from '../modal/modal.js';
import { useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/burger-ingredients.js';

function App() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    dispatch(getItems())
  }, [])

  const background = location.state && location.state.background;

  useEffect(()=>{
   if(location.state && location.state.background){
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
          <IngredientDetails />
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
        <IngredientDetails modal={true}/>
      </Modal> 
      </Route>}
    </>
  );
}

export default App;
