import Image from 'next/image';
import styles from '../styles/PizzaCard.module.css';


const PizzaCard = () => {
  return (
    <div className={styles.container}>
    <Image
       src="/img/pizza.png" 
       alt="pizza"
       objectFit="contain"
       width="500"
        height="500"
        />
        <h1 className={styles.title}>FIORI DI LUCA</h1>
        <span className={styles.price}>$19.90</span>
        <p className={styles.desc}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae et fugit earum, enim hic eveniet!</p>
    </div>
  )
}


export default PizzaCard
