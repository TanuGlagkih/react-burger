import React, { useEffect, useState } from 'react'
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, getItems } from '../../services/actions/burger-ingredients';
import { useDrag } from 'react-dnd';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-detales/ingredient-details';

const MenuItems = ({ current, setCurrent }) => {

  useEffect(() => {
    switch (current) {
      case 'bun': {
        return document.getElementById('bunsList').scrollIntoView();
      }
      case 'sauce': {
        return document.getElementById('sauceList').scrollIntoView();
      }
      case 'main': {
        return document.getElementById('mainList').scrollIntoView();
      }
    }
  }, [current])

  return (
    <div id='menu' className={styles.flex}>
      <Tab value="bun" active={current === 'bun'} onClick={setCurrent} >
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent} >
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={setCurrent} >
        Начинки
      </Tab>
    </div>
  )
}

const Item = ({ item }) => {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const openModal = () => {
    setActive(true);
    dispatch(getDetails(item._id));
  }
  const [{ opacity }, ref] = useDrag({
    type: 'all',
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    < >
      <li className={styles.li} key={item._id} onClick={openModal} ref={ref} style={{ opacity }}>
        <img src={item.image} className={styles.img}></img>
        {item.__v !== 0 &&
          <Counter count={item.__v} size="default" />}
        <div className={styles.price}>
          <p className="text text_type_digits-default">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.text} text text_type_main-default `} > {item.name} </p>
      </li>
      <Modal active={active} setActive={setActive}>
        <IngredientDetails /*key={props.items._id} item={props.items} active={active}*/ />
      </Modal>
    </>
  )
}

Item.propTypes = {
  items: PropTypes.object,
};

const Ingredients = ({ setCurrent }) => {

  function getCords() {
    const menu = document.getElementById('menu').getBoundingClientRect().top;
    const bunSection = document.getElementById('bunsList').getBoundingClientRect().top;
    const sauceSection = document.getElementById('sauceList').getBoundingClientRect().top;
    const mainSection = document.getElementById('mainList').getBoundingClientRect().top;

    Math.abs(menu - bunSection) < Math.abs(menu - sauceSection) ?
      setCurrent('bun')
      :
      Math.abs(menu - sauceSection) > Math.abs(menu - mainSection) ?
        setCurrent('main')
        :
        setCurrent('sauce');
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems())
  }, [dispatch])

  const { items } = useSelector(state => state.burger);

  return (
    <div onScroll={getCords} className={styles.container}>

      <section id='bunsList' className={styles.section}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={styles.ingredients}>
          {items.filter(item => item.type === 'bun').map(item => (
            <Item key={item._id} item={item} />
          ))}
        </ul>
      </section>

      <section id='sauceList' className={styles.section}>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={styles.ingredients}>
          {items.filter(item => item.type === 'sauce').map(item => (
            <Item key={item._id} item={item} />
          ))}
        </ul>
      </section>

      <section id='mainList' className={styles.section}>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={styles.ingredients}>
          {items.filter(item => item.type === 'main').map(item => (
            <Item key={item._id} item={item} />
          ))}
        </ul>
      </section>

    </div>
  )
}

Ingredients.propTypes = {
  setCurrent: PropTypes.func,
};

const BurgerIngredients = () => {

  const [current, setCurrent] = useState('bun')

  return (
    <div className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large">Собрать бургер</h1>
      <div className={styles.menu}>
        <MenuItems current={current} setCurrent={setCurrent} />
      </div>
      <Ingredients current={current} setCurrent={setCurrent} />
    </div>
  )
}

export default BurgerIngredients;