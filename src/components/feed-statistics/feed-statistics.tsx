import { useSelector } from '../../services/types'
import { TOrderItem } from '../../utils/types';
import styles from './feed-statistics.module.css'

export const FeedStatistics = () => {
    const { messages } = useSelector(state => state.allSocket)
    const orders = messages?.orders;
    const total = messages?.total;
    const totalToday = messages?.totalToday;

    let ordersDone: Array<TOrderItem> = []
    if (orders) {
        ordersDone = orders.filter((order: TOrderItem) => order.status === 'done')
    }

    let ordersPending: Array<TOrderItem> = []
    if (orders) {
        ordersPending = orders.filter((order: TOrderItem) => order.status === 'pending')
    }

    return (
        <div className={`${styles.box} ml-15`}>
            <div className={styles.orders}>
                <div className='$mr-9'>
                    <h2 className='text text_type_main-medium pb-6'>Готовы</h2>
                    <ul className={styles.list}>
                        {ordersDone.map((order, index) => (
                            <li key={index} className={`${styles.item} text text_type_digits-default pb-2`}>{order.number}</li>
                        ))}
                    </ul>
                </div>
                <div className='ml-9'>
                    <h2 className='text text_type_main-medium pb-6'>В работе</h2>
                    <ul className={styles.lists}>
                        {ordersPending.map((order, index) => (
                            <li key={index} className={`${styles.item} text text_type_digits-default pb-2`}>{order.number}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
            <p className='text text_type_digits-large'>{total}</p>
            <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
            <p className='text text_type_digits-large'>{totalToday}</p>
        </div>
    )
}