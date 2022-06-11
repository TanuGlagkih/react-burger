import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { MODAL_CLOSE } from '../services/actions/modal';
import { INGREDIENT_DETAILS_CLOSING } from '../services/actions/burger-ingredients';
import { CLOSE_ORDER_DETAILS } from '../services/actions/order-details';

const ModalOverlay = () => {
    const { modalIsActive } = useSelector(state => state.modal);
    const dispatch=useDispatch();

    const handleClosing = () => {
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
    return (
        <div className={modalIsActive ? styles.backgroundActive : styles.background} onClick={handleClosing} />
    )
}

ModalOverlay.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func,
}

export default ModalOverlay;