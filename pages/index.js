import axios from 'axios';
import { useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Layout from '../components/Layout';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import InfiniteScrollProducts from '../components/InfiniteScrollProducts';

export default function Home({ products, featuredProducts }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  console.log(products, featuredProducts);

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.className = 'text-primary-light bg-colored-light p-1 rounded-lg';
    ToastContainer.className = 'text-primary-light bg-colored-light p-1 rounded-lg';


    toast.success(
      `${product.name} added to cart. Total items: ${cart.cartItems.length + 1}`
    );
  };

  return (
    <Layout title="Home Page">
      <h2 className=" my-4">Latest Products</h2>

        <InfiniteScrollProducts products={products} addToCartHandler={addToCartHandler} /> 

     
   


    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
