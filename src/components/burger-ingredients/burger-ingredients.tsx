import React, { useEffect, useState } from 'react'
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { IIngredients } from '../../utils/types';
import { useSelector } from '../../services/types/index';

interface IMenuItemsProps {
  current: string,
  setCurrent: (current: string)=>void,
}

  const MenuItems = ({ current, setCurrent }: IMenuItemsProps) => {

  useEffect(() => {
    switch (current) {
      case 'bun': {
        return (document.getElementById('bunsList') as HTMLDivElement).scrollIntoView();
      }
      case 'sauce': {
        return (document.getElementById('sauceList')as HTMLDivElement).scrollIntoView();
      }
      case 'main': {
        return (document.getElementById('mainList')as HTMLDivElement).scrollIntoView();
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

interface IItemProps {
  item: IIngredients
}

const Item = ({ item }: IItemProps) => {
  let location = useLocation();

  const [{ opacity }, ref] = useDrag({
    type: 'all',
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <>
      <Link
        key={item._id}
        to={{
          pathname: `/ingredients/${item._id}`,
          state: { background: location }
        }}
        className={styles.link}
      >
        <li className={styles.li} key={item._id} ref={ref} style={{ opacity }}>
          <img src={item.image} className={styles.img}></img>
          {item.__v !== 0 &&
            <Counter count={item.__v} size="default" />}
          <div className={styles.price}>
            <p className={`${styles.link} text text_type_digits-default`}>{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${styles.text} text text_type_main-default `} > {item.name} </p>
        </li>
      </Link>
    </>
  )
}

const Ingredients = ({ setCurrent }: IMenuItemsProps) => {

  function getCords() {
    const menu = (document.getElementById('menu')as HTMLDivElement).getBoundingClientRect().top;
    const bunSection = (document.getElementById('bunsList')as HTMLDivElement).getBoundingClientRect().top;
    const sauceSection = (document.getElementById('sauceList')as HTMLDivElement).getBoundingClientRect().top;
    const mainSection = (document.getElementById('mainList')as HTMLDivElement).getBoundingClientRect().top;

    Math.abs(menu - bunSection) < Math.abs(menu - sauceSection) ?
      setCurrent('bun')
      :
      Math.abs(menu - sauceSection) > Math.abs(menu - mainSection) ?
        setCurrent('main')
        :
        setCurrent('sauce');
  }

    const { items } = useSelector(state => state.burger); 

  return (
    <div onScroll={getCords} className={styles.container}>

      <section id='bunsList' className={styles.section}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={styles.ingredients}>
          {items.filter((item: IIngredients) => item.type === 'bun').map((item: IIngredients) => (
            <Item key={item._id} item={item} />
          ))}
        </ul>
      </section>

      <section id='sauceList' className={styles.section}>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={styles.ingredients}>
          {items.filter((item: IIngredients) => item.type === 'sauce').map((item: IIngredients) => (
            <Item key={item._id} item={item} />
          ))}
        </ul>
      </section>

      <section id='mainList' className={styles.section}>
        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={styles.ingredients}>
          {items.filter((item: IIngredients) => item.type === 'main').map((item: IIngredients) => (
            <Item key={item._id} item={item} />
          ))}
        </ul>
      </section>

    </div>
  )
}

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