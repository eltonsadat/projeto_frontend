import axios from 'axios';

const API_URL = 'https://dummyjson.com';

export const getAllProducts = async () => {
  let products: any[] = [];
  let skip = 0;
  const limit = 30;

  while (true) {
    const response = await axios.get(`${API_URL}/products`, {
      params: { skip, limit },
    });
    products = [...products, ...response.data.products];
    skip += limit;
    if (response.data.products.length < limit) {
      break;
    }
  }

  return products;
};

export const addProduct = async (product: any) => {
  const response = await axios.post(`${API_URL}/products/add`, product);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await axios.delete(`${API_URL}/products/${id}`);
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const updateProduct = async (id: number, product: any) => {
  const response = await axios.put(`${API_URL}/products/${id}`, product);
  return response.data;
};
