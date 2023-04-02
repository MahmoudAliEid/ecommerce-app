import React, { Fragment,useEffect } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
const Home = () => {
  const dispatch = useDispatch()
  const {loading,products,error,productsCount}=useSelector(state=>state.products)
  //useEffect runs when this component is loading it like a constructor of class
  useEffect(() => {
    //get all Products from Backend
      dispatch(getProducts())
  }, [dispatch])
return (
    
  <Fragment>
    {loading ? <h1>Loading.....</h1> : (<Fragment>
       <MetaData title={"Buy Best Products Online"}/>
        <h1 id="products_heading">Latest Products</h1>
           <section id="products" className="container mt-5">
              <div className="row">
                    {products && products.map(product => (
                      <Product key={product._id} product={product}></Product>
                    ))}
            </div>
    </section>
    </Fragment>)}

   
</Fragment>

)

}
export default Home