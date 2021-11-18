import axios from "axios";


// create a product
export const createProduct = async (product, authToken) => {
    console.log("create Product in connect to backend is called ")
    return await axios.post(
      `${process.env.REACT_APP_API}/product`,product,
      {headers: {
          authToken: authToken
      }}
    );
  };


  export const getAllProducts = async () => {

    return await axios.get(
      `${process.env.REACT_APP_API}/products`,
    );
  }
