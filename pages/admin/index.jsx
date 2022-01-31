import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../../styles/Admin.module.css';

const Index = ( {orders,products} ) => {

  const [ pizzaList,setPizzaList ] = useState(products);
  const [ orderList,setOrderList ] = useState(orders);

  const status = ["preparing","on the way","delivered"];
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setPizzaList(pizzaList?.filter(pizza => pizza._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const handleStatus = async (id) => {
    const item = orderList.find(order => order._id === id);
    item.status = item.status >= 2 ? 0: item.status + 1;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/"+id,{status: item.status });
      setOrderList(orderList?.map(order => order._id === id ? res.data.order : order));
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Pizza Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr className={styles.trTitle} key={product._id}>
                <td>
                  <Image
                    src={product.img}
                    alt={product.title}
                    width={60}
                    height={60}
                    objectFit="cover"
                  // quality={100}
                  />
                </td>
                <td>{product._id.slice(0,5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button 
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map(order => (
              <tr className={styles.trTitle} key={order._id}>
                <td>{order._id.substring(0, 5) + "..."}
                </td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>{order.method === 0 
                  ? (<span>cash</span>)
                  : (<span>paid</span>)
                }</td>
                <td>{status[order.status]}</td>
                <td>
                  <button 
                    className={styles.button}
                    onClick={() => handleStatus(order._id) }
                    >Next Stage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;

export const getServerSideProps = async (ctx) => {

  const productList = await axios.get("http://localhost:3000/api/products");
  const orderList = await axios.get("http://localhost:3000/api/orders");
  console.log(productList.data.products);
  return {
    props: {
      products: productList.data.products,
      orders: orderList.data.orders,
    }
  }
}
