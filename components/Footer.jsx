import Image from 'next/image';
import styles from '../styles/Footer.module.css';


const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image
          src="/img/bg.png"
          layout="fill"
          alt="pizza"
          objectFit="cover"
        />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>OH YES, WE DID.THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA</h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> New York, NY 10019
            <br /> (602) 543-5678
          </p>
          <p className={styles.text}>
            7th Avenue, New York, #235.
            <br /> New York, NY 10019
            <br /> (602) 345-5678
          </p>
          <p className={styles.text}>
            3rd Avenue, New York, #104.
            <br /> New York, NY 10019
            <br /> (602) 344-4343
          </p>
          <p className={styles.text}>
            161 W. Carroll Street, New York, #125.
            <br /> New York, NY 85022
            <br /> (602) 787-5678
          </p>
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            Monday - Friday:
            <br /> 11:00 AM - 10:00 PM
          </p>
          <p className={styles.text}>
            Saturday - Sunday: 
            <br /> 12:00 AM - 23:00 PM
          </p>


        </div>

      </div>

    </div>
  )
}

export default Footer
