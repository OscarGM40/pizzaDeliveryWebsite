import axios from 'axios'
import Head from 'next/head'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'

export default function Home({pizzaList}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{'Pizza Restaurant Dante\'s'}</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  // console.log(ctx,'context');

 const { data }  = await axios.get("http://localhost:3000/api/products")

//  console.log(data,'<- data');

  return {
    props: {
      pizzaList: data.products
    }
  }
}