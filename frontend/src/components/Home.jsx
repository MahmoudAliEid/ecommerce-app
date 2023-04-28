import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layouts/Loader';
import { toast } from 'react-toastify';
import MetaData from './layouts/MetaData';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);




const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1,1000]);
  const dispatch = useDispatch();
  const {keyword}=useParams()
  const { loading, products, error, productsCount = 0, resPerPage } = useSelector(
    (state) => state.products
  );
 
  useEffect(() => {
    if (error) {
      toast.error(`${error}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    dispatch(getProducts(keyword,currentPage,price));
  }, [dispatch, error, currentPage ,keyword,price]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

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

                {keyword ? (<>
                  <div className="col-6 col-m-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1:`$1`
                          ,
                          1000:`$1000`
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 100]}
                        tipFormatter={value => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible:true
                        }}
                        value={price}
                        onChange={price=>setPrice(price)}
                      ></Range>
                      </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                products.map((product) => <Product key={product._id} product={product} col={4}/>)}
                    </div>
                  </div>
                </>) :( products &&
                products.map((product) => <Product key={product._id} product={product} col={3} />))
                }
            </div>
          </section>
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText={'Next'}
              prevPageText={'Prev'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass="page-item"
              linkClass="page-link"
            ></Pagination>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
