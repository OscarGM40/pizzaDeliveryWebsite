import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';


const PizzaList = ({pizzaList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN THE TOWN</h1>
      <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore culpa quas quia eaque corrupti neque dolores expedita itaque consequatur consequuntur tempora iusto reiciendis, libero nulla?.</p>
      <div className={styles.wrapper}>
        { pizzaList?.map(pizza => 
           <PizzaCard key={pizza._id} pizza={pizza} />) 
        }
      </div>

    </div>
  )
}

export default PizzaList
