import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from '../services/types'
import { dateTime } from '../utils/data-time'
import { IIngredients, TIngredientDetailsProps, TOrderItem } from '../utils/types'
import styles from './pages.module.css'

export const FeedDetails = ({ modal, orderProps }: TIngredientDetailsProps) => {
    const location = useLocation();
    const { id } = useParams<{ id?: any }>();
    const { items } = useSelector(state => state.burger);
    var { authMessages, messages } = useSelector(state => state.allSocket);

    var orders = location.pathname === `/profile/orders/${id}` ?
        authMessages?.orders
        :
        messages?.orders

    var order = orderProps ? orderProps
        :
        orders?.find((order: TOrderItem) => order.number == id)

    const orderItems: Array<IIngredients> = items.reduce((acc: Array<IIngredients>, item) => {
        if (order?.ingredients.includes(item._id)) acc.push(item);
        return acc;
    }, []);

    const price = useMemo(() => {
        return orderItems?.reduce((acc: number, item: IIngredients) => (
            item.type === 'bun' ? item.price * 2 : item.price)
            + acc, 0)
    }, [order])

    const statusText = useMemo(() => {
        return order?.status === 'pending' ?
            "Готовится"
            : order?.status === 'done' ?
                "Выполнен" : "Создан"
    }, [order])

    if (!order) return <h1 className='text text_type_main-medium mt-6 ml-6'> Загрузка...</h1>

    return (
        <div className={styles.mainBox}>
            <section className={modal ? styles.details : styles.detailsBox}>
                <p className={`${styles.number} text text_type_digits-default mt-6 mb-8`}>#{order?.number}</p>
                <p className={`${styles.text} text text_type_main-medium mb-3`}>{order?.name}</p>
                <p className={`${styles.status} text text_type_main-small mb-8}`}>{statusText}</p>
                <p className="text text_type_main-medium mb-4">Состав:</p>
                <div>
                    <ul className={`${styles.ingrList} mb-2 `}>
                        {orderItems.map((item: IIngredients, index: number) => (
                            <li key={index} className={`${styles.ingrItem} mt-4`}>
                                <div className={styles.item}>
                                    <img src={item.image_mobile} className={styles.img} />
                                    <p className="text text_type_main-small">{item.name}</p>
                                </div>
                                <div className={`${styles.price} mr-2`}>
                                    <span className="text text_type_digits-default mr-2">{item.type === 'bun' ? 2 : 1} x {item.price}</span>
                                    <CurrencyIcon type='primary' />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.footer}>
                    <span className="text text_type_main-default text_color_inactive ml-2">{order && dateTime(order.createdAt)}</span>
                    <p className={`${styles.price} text text_type_digits-default`}>
                        <span className='mr-2'>{price}</span>
                        <CurrencyIcon type='primary' />
                    </p>
                </div>
            </section>
        </div>
    )
}