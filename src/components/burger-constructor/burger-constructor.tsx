import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import { orderDetails } from '../../services/actions/order-details';
import { useDrag, useDrop } from 'react-dnd';
import { addBun, addIngredients, moveCard } from '../../services/actions/burger-constructor';
import { v4 as uuidv4 } from 'uuid';
import { ingredientCounterIncrease } from '../../services/actions/burger-ingredients';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useHistory, useLocation } from 'react-router-dom';
import { IIngredients } from '../../utils/types';
import { CLEAR_COUNTER, INGREDIENT_COUNTER_DECREASE, NEW_ORDER, REMOVE_INGREDIENT } from '../../services/constants';
import { useDispatch, useSelector } from '../../services/types/index';

type TMainPartOfBurgerProps = {
  item: IIngredients,
  index: number,
  id: string,
};

type TDraggingElement = {
  id: string,
  index: number,
}

export interface IRemoveIngredient{
  readonly type: typeof REMOVE_INGREDIENT,
  key: string
}

export interface IIngredientCounterDecrease{
  readonly type: typeof INGREDIENT_COUNTER_DECREASE,
  id: string
}

export interface INewOrder{
  readonly type: typeof NEW_ORDER,
}

export interface IClearCounter{
  readonly type: typeof CLEAR_COUNTER,
}

export type TConstructorActions = 
| IRemoveIngredient
| IIngredientCounterDecrease
| INewOrder
| IClearCounter;

const MainPartOfBurger = ({ item, index, id }: TMainPartOfBurgerProps) => {
  const dispatch = useDispatch();
  const handleClose = (id: string, key: string) => {
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
      const dragIndex = (item as TDraggingElement).index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = (ref.current as HTMLDivElement)?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      (item as TDraggingElement).index = hoverIndex
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
          handleClose={() => handleClose(item._id, item.key as string)}
        />
      </li>
    </>
  )
}

const OrderElement = () => {
  const { ingredients } = useSelector(state => state.product);
  const { buns } = useSelector(state => state.product);
  const { isAuth } = useSelector(state => state.requests);
  const dispatch = useDispatch();
  const [active, setActive] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory()

  const openModal = () => {
    if (!buns) {
      return
    }
    if (!isAuth) {
      return history.push('/login', { state: { from: location } })
    }
    const ingredientId = ingredients.map((item: IIngredients) => item._id)
    const bunsId = buns._id;
    const uniqueSet = new Set<string>(ingredientId)
    const orderData = [...uniqueSet]
    orderData.push(bunsId)
    setActive(true)
    dispatch(orderDetails(orderData));
  }

  const totalPrice = useMemo(() => {
    let price = !buns ? 0 : buns.price;
    return ingredients.reduce((sum: number, ingredient: IIngredients) => sum + ingredient.price, 0) + price * 2
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
      <Modal active={active} setActive={setActive} dataTestId='orderOverlay'>
        <OrderDetails />
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
    drop: (item: IIngredients) => {
      if (item.type === "bun") {
        dispatch(addBun(item));
      } else {
        //@ts-ignore
        dispatch(addIngredients({...item, key: uuidv4()}));
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
  }, [orderNumber, dispatch])

  return (
    <div className={styles.box}>
      <div className={styles.items} ref={drop} style={{ ...styles, opacity, border }} id='dropContainer' >
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
            {ingredients.map((item: IIngredients, index: number) => (
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
