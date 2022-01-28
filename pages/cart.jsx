import Image from 'next/image';
import styles from '../styles/Cart.module.css';
import { useDispatch, useSelector } from 'react-redux';


const Cart = () => {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          
          <thead>
            <tr className={styles.trTitle}>
              <th className={styles.th}>Product</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Extras</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Quantity</th>
              <th className={styles.th}>Total</th>
            </tr>
          </thead>

          <tbody>
            { cart.products?.map( product => (
            <tr className={styles.tr} key={product._id}>
              <td className={styles.td}>
                <div className={styles.imgContainer}>
                  <Image
                    src={product.img}
                    layout="fill"
                    objectFit="cover"
                    alt="" />
                </div>
              </td>
              <td className={styles.td}>
                <span className={styles.name}>{product.title}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.extras}>
                  { product.extraOptions.map( extra => extra.text ).join(', ') }
                  </span>
              </td>
              <td className={styles.td}>
                <span className={styles.price}>{product.price}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.quantity}>{product.quantity}</span>
              </td>
              <td className={styles.td}>
                <span className={styles.total}>${(product.price * product.quantity).toFixed(2)}</span>
              </td>
            </tr>
            ) )}     
          </tbody>
        </table>
      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total.toFixed(2)}
          </div>
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
