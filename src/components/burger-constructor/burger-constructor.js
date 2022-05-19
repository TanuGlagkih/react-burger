import React from 'react'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';

const MainPartOfBurger = (props) => {
  return (
    <ul className={styles.ul}>
      {props.items.filter(item => item.type === 'sauce' || item.type === 'main').map(item => (
        <li className={styles.li}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image}
          />
        </li>
      ))}
    </ul>
  )
}

const BunTop = (props) => {
  return (
    <div className={styles.top}>
      {props.items.filter(item => item.type === 'bun' && item.name === "Краторная булка N-200i").map(item => (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${item.name} (верх)`}
          price={item.price}
          thumbnail={item.image}
        />
      ))}
    </div>
  )
}

const BunBottom = (props) => {
  return (
    <div className={styles.bottom}>
      {props.items.filter(item => item.type === 'bun' && item.name === "Краторная булка N-200i").map(item => (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${item.name} (низ)`}
          price={item.price}
          thumbnail={item.image}
        />
      ))}
    </div>
  )
}

const OrderElement = (props) => {
  return (
    <div className={styles.order}>
      <div className={styles.cost}>
        <p className="text text_type_digits-medium">{ }</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="medium">Оформить заказ</Button>
    </div>
  )
}

const BurgerConstructor = (props) => {
  return (
    <div className={styles.constructor}>
      <div className={styles.items}>
        <BunTop items={props.data} />

        <MainPartOfBurger items={props.data} />

        <BunBottom items={props.data} />
      </div>
      <OrderElement />
    </div>
  )
}

BurgerConstructor.propTypes = {
  data:
    PropTypes.arrayOf(ingredientType.isRequired).isRequired
};

export default BurgerConstructor;
