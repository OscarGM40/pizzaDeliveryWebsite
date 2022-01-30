import Image from 'next/image';
import styles from '../../styles/Admin.module.css';

const index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.trTitle}>
              <td>
                <Image
                  src="/img/pizza.png"
                  alt="product1"
                  width={100}
                  height={100}
                  quality={100}
                />
              </td>
              <td>PizzaId</td>
              <td>PizzaTitle</td>
              <td>$50</td>
              <td>
                <button className={styles.button}>Edit</button>
                <button className={styles.button}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.item}></div>
    </div>
  );
};

export default index;
