import AppHeader from '../app-header/app-header.js'
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import data from '../../utils/data.js'
import styles from './app.module.css'


function App() {

    return (
      <div className="App">
        <AppHeader />
           <main className={styles.main}>
            <BurgerIngredients data = {data}/>
            <BurgerConstructor data = {data}/>
          </main>  
      </div>
    );
  }
  
  export default App;
  