import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { orderDetails } from '../../services/actions/order-details';
import { useDrag, useDrop } from 'react-dnd';
import { addBun, addIngredients, moveCard, NEW_ORDER, REMOVE_INGREDIENT } from '../../services/actions/burger-constructor';
import { v4 as uuidv4 } from 'uuid';
import { CLEAR_COUNTER, ingredientCounterIncrease, INGREDIENT_COUNTER_DECREASE } from '../../services/actions/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useHistory, useLocation } from 'react-router-dom';

const MainPartOfBurger = ({ item, index, id }) => {
  const dispatch = useDispatch();
  const handleClose = (id, key) => {
    dispatch({
      type: REMOVE_INGREDIENT,
      key: key
    })
    dispatch({
      type: INGREDIENT_COUNTER_DECREASE,
      id: id
    })
  }

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'ingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      item.index = hoverIndex
      dispatch(moveCard(dragIndex, hoverIndex));
    },
  })

  const [{ opacity }, drag] = useDrag({
    type: 'ingredient',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),

  })
  drag(drop(ref));

  return (
    <>
      <li className={styles.li} key={item.key} ref={ref} data-handler-id={handlerId} style={{ opacity }}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => handleClose(item._id, item.key)}
        />
      </li>
    </>
  )
}

MainPartOfBurger.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  id: PropTypes.string
};

const OrderElement = () => {
  const { ingredients } = useSelector(state => state.product);
  const { buns } = useSelector(state => state.product);
  const { isAuth } = useSelector(state => state.requests);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const location = useLocation();
  const history = useHistory()

  const openModal = () => {
    if (!buns) {
      return
    }
    if (!isAuth) {
      return history.push('/login', {state: { from: location }})
    }
    const ingredientId = ingredients.map((item) => item._id)
    const bunsId = buns._id;
    const uniqueSet = new Set(ingredientId)
    const orderData = [...uniqueSet]
    orderData.push(bunsId)
    setActive(true)
    dispatch(orderDetails(orderData));
  }

  const totalPrice = useMemo(() => {
    let price = !buns ? 0 : buns.price;
    return ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0) + price * 2
  }, [buns, ingredients])

  return (
    <>
      <div className={styles.order}>
        <div className={styles.cost}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="medium"
          onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      <Modal active={active} setActive={setActive}>
        <OrderDetails /*active={active} setActive={setActive} */ />
      </Modal>
    </>
  )
}

const BurgerConstructor = () => {
  const { ingredients } = useSelector(state => state.product);
  const { buns } = useSelector(state => state.product);
  const { orderNumber } = useSelector(state => state.order);

  const dispatch = useDispatch();

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'all',
    drop: (item) => {
      if (item.type === "bun") {
        dispatch(addBun(item));
      } else {
        dispatch(addIngredients({ ...item, key: uuidv4() }));
      }
      dispatch(ingredientCounterIncrease(item._id, item.type))
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  let opacity = 1;
  let border = 'transparent'
  if (isActive) {
    opacity = 1;
    border = '2px dashed green';
  } else if (canDrop) {
    opacity = 0.5
    border = '2px dashed green';
  }

  useEffect(() => {
    if (orderNumber) {
      dispatch({
        type: NEW_ORDER,
      })
      dispatch({
        type: CLEAR_COUNTER,
      })
    }
  }, [orderNumber])

  return (
    <div className={styles.box} >
      <div className={styles.items} ref={drop} style={{ ...styles, opacity, border }}>
        <div className={styles.bottom}>
          {(!buns) ? (
            <div className={styles.pos_top}>
              Добавьте булки
            </div>
          ) : (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${buns.name} (верх)`}
              price={buns.price}
              thumbnail={buns.image}
              key={buns._id}
            />
          )}
        </div>
        {(!ingredients.length) ? (
          <ul className={styles.ul}>
            <li className={styles.li}>
              <div className={styles.row}>
                Добавьте начинки
              </div>
            </li>
          </ul>
        ) : (
          <ul className={styles.ul}>
            {ingredients.map((item, index) => (
              <MainPartOfBurger index={index} key={item.key} item={item} id={item._id} />
            ))}
          </ul>
        )}
        <div className={styles.bottom}>
          {(!buns) ? (
            <div className={styles.pos_bottom}>
              Добавьте булки
            </div>
          ) : (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${buns.name} (низ)`}
              price={buns.price}
              thumbnail={buns.image}
              key={buns._id}
            />
          )}
        </div>
      </div>
      <OrderElement />
    </div>
  )
}

export default BurgerConstructor;
