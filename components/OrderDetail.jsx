import styles from '../styles/OrderDetail.module.css';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../redux/cartSlice';

export const OrderDetail = ( { total,createOrder} ) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  // console.log(total,createOrder);
  const [ customer, setCustomer ] = useState('');
  const [ address, setAddress ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createOrder({
      customer,
      address,
      total,
      method: 0,
    });
    dispatch(reset());
  }
  
  return (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <h1 className={styles.title}>You will pay ${total} after delivery.
      </h1>

      <div className={styles.item}>
        <label 
          className={styles.label}
          >Name Surname</label>
        <input 
          type="text" 
          placeholder="John Doe" 
          onChange={e => setCustomer(e.target.value)}
          className={styles.input}/>
      </div>

      <div className={styles.item}>
        <label 
          className={styles.label}
          >Phone Number</label>
        <input 
          type="text" 
          placeholder="+38 099 12 34 57" 
          onChange={e => setCustomer(e.target.value)}
          className={styles.input}/>
      </div>
    
      <div className={styles.item}>
        <label 
          className={styles.label}
          >Address</label>
        <textarea
          type="text" 
          placeholder="Elton St. 505 NY" 
          onChange={e => setAddress(e.target.value)}
          className={styles.textarea}/>
      </div>
      <button 
        className={styles.button}
        onClick={handleSubmit}
      >
        Order
      </button>
    </div>
  </div>
  );
};
