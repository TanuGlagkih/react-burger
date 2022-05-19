import React from 'react'
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';

const MenuItems = () => {
  const [current, setCurrent] = React.useState('bun')
  return (
    <div className={styles.flex}>
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
  return (
    <li className={styles.li} key={props.items.id}>
      <img src={props.items.image} className={styles.img}></img>
      <Counter count={1} size="default" className={styles.counter} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{props.items.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.text} text text_type_main-default `} > {props.items.name} </p>
    </li>
  )
}

Item.propTypes = {
  data:
    PropTypes.arrayOf(ingredientType.isRequired).isRequired
};

const Ingredients = (props) => {
  return (
    <div className={styles.container}>

      <section className={styles.section}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={styles.ingredients}>
          {props.list.filter(item => item.type === 'bun').map(item => (
            <Item key={item._id} items={item} />
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={styles.ingredients}>
          {props.list.filter(item => item.type === 'sauce').map(item => (
            <Item key={item._id} items={item} />
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={styles.ingredients}>
          {props.list.filter(item => item.type === 'main').map(item => (
            <Item key={item._id} items={item} />
          ))}
        </ul>
      </section>

    </div>
  )
}

Ingredients.propTypes = {
  list:
    PropTypes.arrayOf(ingredientType.isRequired).isRequired
};

const BurgerIngredients = (props) => {
  return (
    <div className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large">Собрать бургер</h1>
      <div className={styles.menu}>
        <MenuItems />
      </div>
      <Ingredients list={props.data} />
    </div>
  )
}

BurgerIngredients.propTypes = {
  data:
    PropTypes.arrayOf(ingredientType.isRequired).isRequired
};

export default BurgerIngredients;