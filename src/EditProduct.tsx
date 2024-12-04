import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from './api';
import './App.css';
import { MdPlaylistAddCheck } from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const productDetails = await getProductById(parseInt(id));
                setTitle(productDetails.title);
                setDescription(productDetails.description);
                setCategory(productDetails.category);
                setPrice(productDetails.price.toString());
                setStock(productDetails.stock.toString());
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !category || !price || !stock) {
            toast.warn("Por favor, preencha todos os campos."); return;
        }

        const updatedProduct = {
            title,
            description,
            category,
            price: parseFloat(price),
            stock: parseInt(stock),
        };

        if (id) {
            await updateProduct(parseInt(id), updatedProduct);
            toast.success('Produto atualizado com sucesso!');
            await delay(4000);
            navigate(`/product/${id}`);
        }
    };

    return (
        <div>
            <h1>Atualizar Produto</h1>

            <form onSubmit={handleSubmit}>
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
                            <MdPlaylistAddCheck title='Salvar' color='#7DDA58' size={40} onClick={(e) => handleSubmit(e)} />
                        </td>
                    </tr>
                </table>

            </form>

            <TiArrowBack title='Voltar' color='#FFF' size={40} onClick={() => navigate(`/product/${id}`)} />
            <ToastContainer />
        </div>
    );
};

export default EditProduct;
