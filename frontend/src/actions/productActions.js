import axios from "axios";
import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_SUCCESS,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstants";
export const getProducts = () => async (disptach) => {
  try {
    disptach({ type: ALL_PRODUCTS_REQUEST });
    const { data } = await axios.get("/products");
    disptach({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    disptach({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getProductDetails = (id) => async (disptach) => {
  try {
    disptach({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/products/${id}`);
    disptach({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    disptach({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Function of clear Errrors
export const clearErrors = () => async (disptach) => {
  disptach({ type: CLEAR_ERRORS });
};
