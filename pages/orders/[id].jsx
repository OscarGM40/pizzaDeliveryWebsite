import axios from 'axios';
import Image from 'next/image';
import styles from '../../styles/Order.module.css';

const Order = ({order}) => {
  console.log(order, 'order');

  const status = order.status;

  const statusClass = (index) => {
    if (index - status < 1) return styles.done
    if (index - status === 1) return styles.inProgress
    if (index - status > 1) return styles.undone
  }


  return (
    <div className={styles.container}>

      <div className={styles.left}>

        <div className={styles.row}>
          <table className={styles.table}>
            <thead>

              <tr className={styles.trTitle}>
                <th className={styles.th}>Order ID</th>
                <th className={styles.th}>Customer</th>
                <th className={styles.th}>Address</th>
                <th className={styles.th}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>

                <td className={styles.td}>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.name}>{order.customer}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.address}>{order.address}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.total}>${order.total.toFixed(2)}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.row}>

          <div className={statusClass(0)}>
            <Image
              src="/img/paid.png"
              width={40}
              height={40}
              alt="paid" />
            <span className={styles.payment}>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={25}
                height={25}
                alt="paid" />
            </div>
          </div>

          <div className={statusClass(1)}>
            <Image
              src="/img/bake.png"
              width={40}
              height={40}
              alt="paid" />
            <span className={styles.payment}>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={25}
                height={25}
                alt="paid" />
            </div>
          </div>

          <div className={statusClass(2)}>
            <Image
              src="/img/bike.png"
              width={40}
              height={40}
              alt="paid" />
            <span className={styles.payment}>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                src="/img/checked.png"
                className={styles.checkedIcon}
                width={25}
                height={25}
                alt="paid" />
            </div>
          </div>

          <div className={statusClass(3)}>
            <Image
              src="/img/delivered.png"
              width={40}
              height={40}
              alt="paid" />
            <span className={styles.payment}>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={25}
                height={25}
                alt="paid" />
            </div>
          </div>
        </div>

      </div>

      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${order.total.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${order.total.toFixed(2)}
          </div>
          <button className={styles.button}>PAID</button>
        </div>
      </div>

    </div>
  );
};

export default Order;

export const getServerSideProps = async (ctx) => {
  /* aqui si es params */
  // console.log(ctx.params.id, 'id');
  const { id } = ctx.params;
  const resp = await axios.get(`http://localhost:3000/api/orders/${id}`);
  
  return {
    props: {
      order: resp.data.order
    }
  }
}
