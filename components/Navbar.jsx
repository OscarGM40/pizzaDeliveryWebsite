import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import styles from '../styles/Navbar.module.css';


const Navbar = () => {

  const cartState = useSelector(state => state.cart);

  return (
    <div className={styles.container}>

      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image
            src="/img/telephone.png"
            alt=""
            width={32}
            height={32}
          />
        </div>

        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>+01 234 56 78</div>
        </div>
      </div>

      <div className={styles.item}>

        <ul className={styles.list}>
          <Link href="/" passHref >
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <Link href="/admin" passHref >
            <li className={styles.listItem}>Admin</li>
          </Link>
          <li className={styles.listItem}>Menu</li>
          <Image
            src="/img/logo.png"
            
            alt=""
            width={160}
            height={69}
          />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>

      </div>

      <Link href="/cart" passHref >
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image
              src="/img/cart.png"
              alt=""
              width={40}
              height={40}
            />
            <div className={styles.counter}>{cartState.quantity} </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Navbar
