import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css'

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import ModalOverlay from "../modal-overlay/modal-overlay"
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const modalRoot = document.getElementById('react-modals')!

interface IModal {
    active: boolean, 
    setActive: (active: boolean)=> void, 
    children?: JSX.Element, 
    back?: boolean,
}

const Modal = ({ active, setActive, children, back }: IModal) => {
    const history = useHistory();
    
    const handleClose = () => {
        setActive(false)
        if (back) {
            history.goBack();
        }
    }
    useEffect(() => {
        function close(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                handleClose()
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

export default Modal; 