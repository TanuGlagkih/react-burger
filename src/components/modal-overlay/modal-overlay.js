import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const ModalOverlay = ({ active, setActive, back }) => {
    const history = useHistory();
    
    const handleClosing = () => {
        setActive(false)
           if (back) {
                    history.goBack();
                }
    }
    return (
        <div className={active ? styles.backgroundActive : styles.background} onClick={handleClosing} />
    )
}

ModalOverlay.propTypes = {
    active: PropTypes.bool,
    setActive: PropTypes.func,
}

export default ModalOverlay;