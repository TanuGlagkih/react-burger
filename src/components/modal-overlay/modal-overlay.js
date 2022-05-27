import styles from './modal-overlay.module.css'

const ModalOverlay = ({ active, setActive }) => {
    const handleClosing = () => {
        setActive(false)
    }
    return (
        <div className={active ? styles.backgroundActive : styles.background} onClick={handleClosing} />
    )
}

export default ModalOverlay;