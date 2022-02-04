import React, { useState } from 'react';
import styles from '../styles/Add.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';

const Add = ({ setClose }) => {

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  /* constateno a los existentes computando */
  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  }

  /* concateno el extra a los existentes */
  const handleExtra = (e) => {
    setExtraOptions(prev => [...prev, extra]);
  }
  /* no puedo mutar el arreglo,asi que lo copio */
  const changePrice = (e, index) => {
    const newPrices = [...prices];
    newPrices[index] = e.target.value;
    setPrices(newPrices);
  }

  /* handlecreate va a tener varios pasos,primero subir la imagen */
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', "pizzaWebsite");
    /* lo subo a Cloudinary,siempre necesito upload_preset?? */
    try {
      const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/oscargm40/image/upload', formData);
      const { secure_url } = uploadRes.data;
      /* si todo sale bien,creo el producto */
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: secure_url
      }
      /*  */
      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);

    } catch (error) {
      console.log(error)
    }
    
  }

  return (<div className={styles.container}>
    <div className={styles.wrapper}>
      <span
        onClick={() => setClose(true)}
        className={styles.close}>
        X
      </span>
      <h1 >Add a new Pizza</h1>

      <div className={styles.item}>
        <label className={styles.label}>Choose an image</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <div className={styles.item}>
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Desc</label>
        <textarea
          rows={4}
          className={styles.textarea}
          type="text"
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      {/* selector de precios */}
      <div className={styles.item}>
        <label className={styles.label}>Prices</label>
        <div className={styles.priceContainer}>
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Small"
            onChange={(e) => changePrice(e, 0)}
          />
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Medium"
            onChange={(e) => changePrice(e, 1)}
          />
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Large"
            onChange={(e) => changePrice(e, 2)}
          />
        </div>
      </div>
      {/* div para seleccionar los extras */}
      <div className={styles.item}>
        <label className={styles.label}>Extra</label>
        <div className={styles.extra}>
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="text"
            placeholder="Item"
            name="text"
            onChange={handleExtraInput}
          />
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleExtraInput}
          />
          <button className={styles.extraButton} onClick={handleExtra}>
            Add
          </button>
        </div>
        {/* div para ver los extras */}
        <div className={styles.extraItems}>
          {extraOptions.map((option) => (
            <span key={option.text} className={styles.extraItem}>
              {option.text}
            </span>
          ))}
        </div>

      </div>
      <button className={styles.addButton} onClick={handleCreate}>
        Create
      </button>
    </div>
  </div>)
    ;
};


export default Add
