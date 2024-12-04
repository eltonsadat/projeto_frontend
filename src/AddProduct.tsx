import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from './api';
import './App.css';
import { TiArrowBack } from "react-icons/ti";
import { MdPlaylistAdd } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category || !price || !stock) {
      toast.error('Por favor, preencha todos os campos.'); return;
    }

    const newProduct = {
      title,
      description,
      category,
      price: parseFloat(price),
      stock: parseInt(stock)
    };
    await addProduct(newProduct);
    toast.success('Produto cadastrado com sucesso!');
    setTitle('');
    setDescription('');
    setCategory('');
    setPrice('');
    setStock('');
  };

  return (
    <div>
      <h1>Adicionar Produto</h1>
      <form>
        <table>
          <tr>
            <th>Produto</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th></th>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nome do produto"
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do produto"
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Categoria do produto"
                required
              />
            </td>
            <td>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Preço do produto"
                required
              />
            </td>
            <td>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Estoque do produto"
                required
              />
            </td>
            <td>
              <MdPlaylistAdd title='Adicionar' color='#7DDA58' size={40} onClick={(e) => handleSubmit(e)} />
            </td>
          </tr>
        </table>
      </form>
      <TiArrowBack title='Voltar' color='#fff' size={40} onClick={() => navigate('/')} />
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
