import React from 'react' 
import { ConstructorElement, CurrencyIcon, Button  } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import PropTypes from 'prop-types';

const consrtuctorPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  });

const MainPartOfBurger = (props) => {
  return(
    <ul className={styles.ul}>
        {props.items.filter(item=>item.type ==='sauce'||item.type ==='main').map(item =>(
                <li className={styles.li}>
               <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            /> 
            </li>
           ))}
        </ul>
  )
}

const BunTop = (props) => {
  return(
    <div className={styles.top}>
        {props.items.filter(item=>item.type ==='bun' && item.name ==="Краторная булка N-200i").map(item =>(
             <ConstructorElement
              type="top"
              isLocked={true}
              text={`${item.name} (верх)`}
              price={item.price}
              thumbnail={item.image}
            />
             ))}
         </div>           
  )
}

const BunBottom = (props) =>{
  return(
    <div className={styles.bottom}>
    {props.items.filter(item=>item.type ==='bun' && item.name ==="Краторная булка N-200i").map(item =>(
         <ConstructorElement
         type="bottom"
         isLocked={true}
         text={`${item.name} (низ)`}
         price={item.price}
         thumbnail={item.image}
       />
       ))}
   </div>
  )
}

const OrderElement = (props) => {
        return (
          <div className={styles.order}>
              <div className={styles.cost}>
               <p className="text text_type_digits-medium">{}</p>
                <CurrencyIcon type="primary" />
              </div>
                  <Button type="primary" size="medium">Оформить заказ</Button>
             </div>     
        )
      }

 const BurgerConstructor = (props) => {
       return(
          <div className={styles.constructor}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '0px 16px 60px 16px'}}>
             <BunTop items={props.data}/>
             
                  <MainPartOfBurger items={props.data}/>
             
              <BunBottom items={props.data}/>
            </div>
              <OrderElement />
          </div>
       )
   }

   BurgerConstructor.propTypes = {
    items: 
    PropTypes.arrayOf(consrtuctorPropTypes.isRequired).isRequired
  };

export default BurgerConstructor;
