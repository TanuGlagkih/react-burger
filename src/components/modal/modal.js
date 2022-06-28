import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css'

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../modal-overlay/modal-overlay"
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const modalRoot = document.getElementById('react-modals')

const Modal = ({ active, setActive, children, back }) => {
    let history = useHistory();
    
    const handleClose = () => {
        setActive(false)
        if (back) {
            history.goBack();
        }

    }
    useEffect(() => {
        function close(e) {
            if (e.key === 'Escape') {
                setActive(false);
                if (back) {
                    history.goBack();
                }
            }
        }
        document.addEventListener('keydown', close)
        return () => document.removeEventListener('keydown', close)
    }, [setActive])

    return ReactDOM.createPortal(
        <div className={active ? styles.containerActive : styles.container}>
            <ModalOverlay active={active} setActive={setActive}  back={back}/>
            <div className={styles.modal}>
                {children}
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