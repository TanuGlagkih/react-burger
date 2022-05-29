import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ active, setActive }) => {
    const handleClosing = () => {
        setActive(false)
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