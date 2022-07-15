import React from 'react';
import styles from './modal-overlay.module.css';
import { useHistory } from 'react-router-dom';

interface IModalOverlay {
    active: boolean, 
    setActive: (active: boolean)=>void, 
    back: boolean | undefined,
}

const ModalOverlay = ({ active, setActive, back }: IModalOverlay ) => {
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

export default ModalOverlay;