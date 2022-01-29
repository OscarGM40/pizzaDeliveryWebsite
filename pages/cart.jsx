import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice';



const Cart = () => {

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const [ open, setOpen ] = useState(false);
  const [cash, setCash] = useState(false);
  
  const amount = cart.total;
  const currency = "USD";
  const style = {"layout":"vertical"};
  const router = useRouter();

  /* funcion propia para crear la Order y redireccionar,además de limpiar el cartState */
  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if(res.status = 201){
        // console.log(res.data);
        router.push("/orders/"+res.data.order._id);
        dispatch(reset());
      } 
    } catch (error) {
      console.log(error);
    }
  }


  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              
              const shipping = details.purchase_units[0].shipping;

              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };


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
          
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AY2HKVIf7xj2D3ZjKDQJFRgkjhLg1wmbsk5ezG4lTfPbAa7DOQ-HAYULkPtS7nP9e1MWKotBrQZW4ST4",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper
                 currency={currency}
                 showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              PAY NOW!
            </button>
          )}
        </div>
      </div>
      { cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
