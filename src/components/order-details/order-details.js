import styles from './order-details.module.css';
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const OrderDetails = ({ active }) => {

    return (
        <div className={active ? styles.orderActive : styles.order}>
            <p className="text text_type_digits-large mb-8">1234</p>
            <p className="text text_type_main-medium mb-15">Идентификатор заказа</p>
            <CheckMarkIcon type="primary" />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-4">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    active: PropTypes.bool,
}

export default OrderDetails;