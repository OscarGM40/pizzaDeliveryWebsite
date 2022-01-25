import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Featured.module.css';

const images = [
  '/img/featured.png',
  '/img/featured3.png',
  '/img/featured2.png',
]

const Featured = () => {

  const [index, setIndex] = useState(0);

  const handleClick = (dir) => {
    if (dir === 'left') {
      if (index === 0) {
        setIndex(images.length - 1);
      } else {
        setIndex(index - 1);
      }
    } else if (dir === 'right') {
      if (index === images.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer}>
        <Image
          src="/img/arrowl.png"
          onClick={() => handleClick('left')}
          alt="arrow"
          layout="fill"
          objectFit="contain"
          className={styles.arrow} />
      </div>

      <div className={styles.wrapper} style={{
        transform: `translateX(${-100*index}vw)`
      }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.imgContainer}>
            <Image
              src={image}
              layout="fill"
              alt="arrow"
              objectFit='contain'
              className={styles.arrow} />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer}>
        <Image
          src="/img/arrowr.png"
          alt="arrow"
          layout="fill"
          objectFit='contain'
          onClick={() => handleClick('right')}
          className={styles.arrow} />
      </div>
    </div>
  )
}

export default Featured
