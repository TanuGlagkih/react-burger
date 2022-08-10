import React from 'react';
import styles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom';
import { IIngredients } from '../../utils/types'
import { TIngredientDetailsProps } from '../../utils/types'
import { useSelector } from '../../services/types';

const IngredientDetails = ({ modal, dataTestId }: TIngredientDetailsProps) => {
    const { id } = useParams<{id?: string}>();
    const { items } = useSelector(state => state.burger);
    const item = items.find((item: IIngredients) => item._id == `${id}`);

    return (
        <div className={modal ? styles.boxActive : styles.box} data-testid={dataTestId}>
            {item ? (
                <>
                    {modal ? <h1 className={`text text_type_main-medium ${styles.h}`}>Детали ингредиента</h1>
                        :
                        <h1 className={`text text_type_main-medium ${styles.head}`}>Детали ингредиента</h1>
                    }
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
                </>
            ) : (
                <h1 className={`${styles.h} text text_type_main-medium `}>Детали ингредиента</h1>
            )}
        </div>
    )
}

export default IngredientDetails;