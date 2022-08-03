import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/types';
import { dateTime } from '../../utils/data-time';
import { IIngredients, TOrderItem } from '../../utils/types';
import styles from './feed.module.css';

export interface IFeedIteem {
    order: TOrderItem,
    id: string
}

export const FeedItem = ({ order, id }: IFeedIteem) => {
    const { items } = useSelector(state => state.burger)
    let location = useLocation();

    const orderItems: Array<IIngredients> = items.reduce((acc: Array<IIngredients>, item: IIngredients) => {
        if (order.ingredients.includes(item._id)) acc.push(item);
        return acc;
    }, []);

    const itemsCount = orderItems.length < 5 ? null : orderItems.length - 5

    const price = useMemo(() => {
        return orderItems.reduce((acc: number, item: IIngredients) => (
            item.type === 'bun' ? item.price * 2 : item.price)
            + acc, 0)
    }, [orderItems])

    const linkTo = (location.pathname === '/profile/orders') ?
        (`/profile/orders/${order.number}`) :
        (`/feed/${order.number}`);

    const statusText = useMemo(() => {
        return order?.status === 'pending' ?
            "Готовится"
            : order?.status === 'done' ?
                "Выполнен" : "Создан"
    }, [order])

    return (
        <>
            <Link
                key={order._id}
                to={{
                    pathname: linkTo,
                    state: { background: location }
                }}
                className={styles.link}
            >
                <li className={styles.box} >
                    <p className={styles.string}>
                        <span className='text text_type_digits-default'>#{order.number}</span>
                        <span className="text text_type_main-default text_color_inactive">{dateTime(order.createdAt)}</span>
                    </p>
                    <p className='text text_type_main-medium mt-6'>{order.name}</p>
                    {linkTo === `/profile/orders/${order.number}` ?
                        <p className={`${styles.status} text text_type_main-small mb-8}`}>{statusText}</p>
                        :
                        <></>}
                    <div className={`${styles.elem} mt-6`}>
                        <div className={styles.image} >
                            {orderItems.map((item, index: number) => (
                                index === 0 && itemsCount ?
                                    <div key={index} style={{ backgroundImage: `url(${item.image_mobile})`, backgroundPosition: 'center', display: 'flex' }} className={styles.img}>
                                        <span className='text text_type_digits-default'>+{itemsCount}</span>
                                    </div>
                                    : <img src={item.image_mobile} className={styles.img} key={index} />
                            ))}</div>
                        <p className={`${styles.price} text text_type_digits-default mt-6`}>
                            <span className='mr-2'>{price}</span>
                            <CurrencyIcon type='primary' />
                        </p>
                    </div>
                </li>
            </Link>
        </>
    )
}

export const Feed = () => {
    const location = useLocation();

    const { messages } = useSelector(state => state.allSocket)
    var orders = messages?.orders

    if (location.pathname === '/profile/orders' && orders) {
        orders = [...orders].reverse()
    }

    return (
        <div className={styles.feed}>
            <div className={styles.container}>
                <ul>
                    {orders && orders.map((order: TOrderItem, index: number) => (
                        <FeedItem key={index} order={order} id={order._id} />
                    ))}
                </ul>
            </div>
        </div>
    )
}