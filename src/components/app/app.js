import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import styles from './app.module.css'

function App() {

  const [state, setState] = useState({ hasError: false, products: [] });
  const url = 'https://norma.nomoreparties.space/api/ingredients';

  useEffect(() => {
    const getData = () => {
      fetch(url)
        .then(res => res.json())
        .then(data => setState({ ...state, products: data.data }))
        .catch(e => {
          setState({ ...state, hasError: true });
        });
    }
    getData();
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={state.products} />
        <BurgerConstructor data={state.products} />
      </main>

    </div>
  );
}

export default App;
