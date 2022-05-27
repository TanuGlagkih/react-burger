import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../modal-overlay/modal-overlay"
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('react-modals')

const Modal = ({ active, setActive, children }) => {

    useEffect(() => {
        setActive(false)
    }, [])

    const handleClose = () => {
        setActive(false)
    }
    useEffect(() => {
        function close(e) {
            if (e.key === 'Escape') {
                setActive(false)
            }
        }
        document.addEventListener('keydown', close)
        return () => document.removeEventListener('onkeydown', close)
    }, [])


    return ReactDOM.createPortal(
        <div className={active ? styles.containerActive : styles.container}>
            <ModalOverlay active={active} setActive={setActive} />
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