import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct } from './api';
import './App.css';
import { CgDetailsMore } from "react-icons/cg";
import { MdDeleteForever } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const productsList = await getAllProducts();
      setProducts(productsList);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
    toast.warn('Produto apagado com sucesso!');
  };

  const handleDetails = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  return (
    <div>
      <h1>Lista de Produtos</h1>
      
      {
        loading ? <p>Carregando Produtos...</p> :
          <table>
            <thead>
              <tr><MdPlaylistAdd title='Adicionar Produto' color='#7DDA58' size={40} onClick={handleAddProduct} /></tr>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>
                    <CgDetailsMore title='Detalhes' color='#5DE2E7' size={30} onClick={() => handleDetails(product.id)} />
                    <MdDeleteForever title='Apagar' color='#D20103' size={30} onClick={() => handleDelete(product.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      }
      <ToastContainer />
    </div>
  );
};

export default ProductList;
