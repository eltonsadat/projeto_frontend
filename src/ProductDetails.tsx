import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from './api';
import './App.css';
import { TiArrowBack } from "react-icons/ti";
import { MdEditNote } from "react-icons/md";


const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      if (id) {
        const productDetails = await getProductById(parseInt(id));
        setProduct(productDetails);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);


  return (

    <div>


      {
        loading ? <p>Carregando Detalhes do Produto...</p> :
          <table>

            <tr><h1>{product.title}</h1></tr>
            <tr><p>{product.description}</p></tr>
            <tr><p>Categoria: {product.category}</p></tr>
            <tr><p>Preço: ${product.price}</p></tr>
            <tr><p>Estoque: {product.stock}</p></tr>
            <tr>
              <TiArrowBack title='Voltar' color='#FFF' size={40} onClick={() => navigate('/')} />
              <MdEditNote title='Editar' color='#7DDA58' size={40} onClick={() => navigate(`/product/${id}/edit`)} />

            </tr>

          </table>
      }
    </div>
  );
};

export default ProductDetails;
