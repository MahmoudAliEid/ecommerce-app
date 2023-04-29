import React, { Fragment } from 'react';
import '../../App.css';
import Search from './search';
import { Link } from 'react-router-dom';

const Header = () => {
  
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img alt="logo" src="/images/logo.png" />
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
           <Search  />
               
                </div>   


        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/login"  className="btn ml-4" id="login_btn">
            Login
          </Link>

          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
