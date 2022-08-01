import React from 'react';
import styles from './order-details.module.css';
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from '../../services/types';

const OrderDetails = () => {
    const { orderNumber, showOrderDetails, customMessage } = useSelector(state => state.order)

    return (
        <>
            {!customMessage ? (
                <div className={showOrderDetails ? styles.orderActive : styles.order}>
                    <p className="text text_type_digits-large mb-8">{orderNumber}</p>
                    <p className="text text_type_main-medium mb-15">Идентификатор заказа</p>
                    <CheckMarkIcon type="primary" />
                    <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive mt-4">Дождитесь готовности на орбитальной станции</p>
                </div>
            ) : (
                <div className={styles.message}>
                    <p className="text text_type_main-medium mb-15">{customMessage}</p>
                </div>
            )}
        </>
    )
}

export default OrderDetails;