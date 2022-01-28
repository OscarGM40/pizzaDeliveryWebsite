
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import styles from '../../styles/Product.module.css';


const Product = ({pizza}) => {

  const [size, setSize] = useState(0);
  const [price,setPrice] = useState(pizza.prices[0]);
  const [extras,setExtras] = useState([]);
  const [quantity,setQuantity] = useState(1);

  const dispatch = useDispatch();

  const changePrice = (number) => {
    setPrice(price + number);
  }

  const handleSize = (sizeIndex) => {
    const diff = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(diff);    
  }
  
  const handleChange = (e,option) => {
    const checked = e.target.checked;
    
    if(checked) {
      setExtras((extras) => [...extras,option]);
      changePrice(option.price);
    }else{
      changePrice(-option.price);
      setExtras(extras.filter(item => item.id !== option.id));
    }
  }
  // console.log(extras);
  // console.log(quantity);

  const handleAddToCart = () => {
    dispatch(addProduct({...pizza,extras,price,quantity}));
  }
  

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            layout="fill"
            objectFit="contain"
            alt="" />
        </div>
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>${pizza.desc}</p>
        <p className={styles.size}></p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image
              src="/img/size.png"
              alt=""
              layout="fill" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image
              src="/img/size.png"
              alt=""
              layout="fill" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image
              src="/img/size.png"
              alt=""
              layout="fill" />
            <span className={styles.number}>Large</span>
          </div>
        </div>

        <h2 className={styles.choose}>Choose additional ingredientes</h2>
        <div className={styles.ingredients}>
        {/* {console.log(pizza.extraOptions)}  */}
         {pizza.extraOptions.map( option => (
          <div className={styles.option} key={option._id}>
            <input
              type="checkbox"
              id={option.text}
              name={option.text}
              onChange={(e)=>handleChange(e,option)}
              className={styles.checkbox} />
            <label htmlFor="double">
              {option.text}
            </label>
          </div>
         ))} 

        </div>

        <div className={styles.add}>
          <input
            type="number"
            defaultValue="1"
            className={styles.quantity} 
            onChange={(e)=>setQuantity(+e.target.value)}
            min="1"
            max="10"
            />
            <button className={styles.button}
            onClick={handleAddToCart}
            >Add to Cart</button>
        </div>


      </div>

    </div>
  )
}

export default Product


export async function getServerSideProps(context) {
  // console.log(context.params.id)

  const res = await axios.get(`http://localhost:3000/api/products/${context.params.id}`);
  const product = res.data;

  return {
    props: {
      pizza: product.product
    },
  };
}
