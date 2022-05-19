import React from 'react' 
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import PropTypes from 'prop-types';

const ingredientsPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  });

const MenuItems = () => {
    const [current, setCurrent] = React.useState('bun')
    return (
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    )
  }

  const Item = (props) => {
    return(
      <li className = {styles.li} key={props.items.id}>
        <img src = {props.items.image} className={styles.img}></img>
           <Counter count={1} size="default" className={styles.counter}/>
             <div className = {styles.price}>
              <p className ="text text_type_digits-default">{props.items.price}</p>
                <CurrencyIcon type="primary" />
             </div>
                  <p className={`${styles.text} text text_type_main-default `} > {props.items.name} </p>    
                </li>
    )
  }

  const Ingredients = (props) => {
     return(
       <div className={styles.container}>
          <section className={styles.section}>
           <h2 className="text text_type_main-medium">Булки</h2>
            <ul className={styles.ingredients}>
              {props.list.filter(item=>item.type ==='bun').map(item =>(
                <Item items = {item}/>
                  ))}
           </ul>      
          </section>
          
          <section className={styles.section}>
            <h2 className="text text_type_main-medium">Соусы</h2>
             <ul className={styles.ingredients}>
              {props.list.filter(item=>item.type ==='sauce').map(item =>(
                <Item items = {item}/> 
              ))}
             </ul>         
           </section>

           <section className={styles.section}>
             <h2 className="text text_type_main-medium">Начинки</h2>
              <ul className={styles.ingredients}>
               {props.list.filter(item=>item.type ==='main').map(item =>(
                 <Item items = {item}/>
               ))}
             </ul> 
           </section>
       </div>
    )
}

const BurgerIngredients = (props) =>{
        return(
           <div className={styles.burgerIngredients}>
            <h1 className="text text_type_main-large">Собрать бургер</h1>
               <div className={styles.menu}>
                <MenuItems />
              </div>
              <Ingredients list = {props.data}/>
           </div>
        )
    }

BurgerIngredients.propTypes = {
  items: 
  PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
};

export default BurgerIngredients;