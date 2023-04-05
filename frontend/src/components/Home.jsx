import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layouts/Loader';
import {  toast } from 'react-toastify';
import MetaData from './layouts/MetaData'
const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(state => state.products);
  

  useEffect(() => {
   
    if (error) {
     toast.error(`${error}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    } 
     
      dispatch(getProducts());
    
  }, [dispatch,error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Buy Best Products Online" />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map(product => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
