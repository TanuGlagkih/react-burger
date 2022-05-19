import AppHeader from './components/app-header/app-header.js'
import BurgerConstructor from './components/burger-constructor/burger-constructor.js';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients.js';
import data from './utils/data.js'


function App() {

    return (
      <div className="App">
        <header className="App-header">
           <AppHeader />
        </header> 
        <main style={{ display: 'flex', justifyContent: 'center'}}>
           <BurgerIngredients data = {data}/>
           <BurgerConstructor data = {data}/>
        </main>  
        
      </div>
    );
  }
  
  export default App;
  