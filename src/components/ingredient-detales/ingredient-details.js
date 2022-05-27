import styles from './ingredient-details.module.css'
import PropTypes from 'prop-types';

const IngredientDetails = ({ active, item }) => {
    return (
        <div className={active ? styles.boxActive : styles.box}>
            <h1 className={`${styles.h} text text_type_main-medium `}>Детали ингредиента</h1>
            <img src={item.image_large}></img>
            <p className={`${styles.text} text text_type_main-medium mt-4 mb-8`}>{item.name}</p>
            <div className={styles.nutrientsBox}>
                <div className='mr-6'>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Калории, ккал<br />{item.calories}</p>
                </div>
                <div className='mr-6'>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Белки, г<br />{item.proteins}</p>
                </div>
                <div className='mr-6'>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Жиры, г<br />{item.fat}</p>
                </div>
                <div>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Углеводы, г<br />{item.carbohydrates}</p>
                </div>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    item: PropTypes.object,
    active: PropTypes.bool
}

export default IngredientDetails;