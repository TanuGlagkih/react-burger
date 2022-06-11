import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../modal-overlay/modal-overlay"
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_CLOSE } from '../services/actions/modal';
import IngredientDetails from '../ingredient-detales/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { INGREDIENT_DETAILS_CLOSING } from '../services/actions/burger-ingredients';
import { CLOSE_ORDER_DETAILS } from '../services/actions/order-details';

const modalRoot = document.getElementById('react-modals')

const Modal = () => {

    const { showDetails } = useSelector(state => state.burger);
    const { modalIsActive } = useSelector(state => state.modal)

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch({
            type: MODAL_CLOSE
        })
        dispatch({
            type: INGREDIENT_DETAILS_CLOSING
        })
        dispatch({
            type: CLOSE_ORDER_DETAILS
        })
    }

    useEffect(() => {
        function close(e) {
            if (e.key === 'Escape') {
                dispatch({
                    type: MODAL_CLOSE
                })
                dispatch({
                    type: INGREDIENT_DETAILS_CLOSING
                })
                dispatch({
                    type: CLOSE_ORDER_DETAILS
                })
            }
        }
        document.addEventListener('keydown', close)
        return () => document.removeEventListener('onkeydown', close)
    }, [])

    const divStyles = () => modalIsActive ? styles.containerActive : styles.container

    return ReactDOM.createPortal(
        <div className={divStyles()}>
            <ModalOverlay />
            <div className={styles.modal}>
                {showDetails ?
                    <IngredientDetails />
                    :
                    <OrderDetails />}
                <div className={styles.close}>
                    <CloseIcon type="primary" onClick={handleClose} />
                </div>
            </div>
        </div>
        , modalRoot
    )
}

Modal.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func,
    children: PropTypes.element,
}

export default Modal;