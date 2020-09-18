import React, { useState, useContext } from 'react';
import { Link, withRouter } from "react-router-dom";
import { web3Context } from "../Context";
import { helperContext } from "../Context/helper";
import { ErrorBoundary } from "../ErrorBoundary";
import { FormContainer } from "../BackgroundStyle";
import { handleFileUpload } from "../Helper/handleFileUpload";
import { ipfs } from "../IPFS_config/ipfs.config";
import './Styles/form.css';

export function CreateNewProduct({ history }) {
    const [productName, setProductName] =  useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [customType, setCustomType] = useState(false);

    const web3Consumer = useContext(web3Context);
    const helperConsumer = useContext(helperContext);

    const { 
        createNewProduct, 
        isLoggedIn, 
        web3, 
        findProductById,
        selectValue, 
        handleSelectChange, 
        getCategory, 
    } = web3Consumer;
    const { buffer, setBuffer, priceConverter } = helperConsumer;

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if(!buffer) return;
            if(!isLoggedIn) return history.push('/login');
            const currType = customType && type ? type : selectValue;

            if(!productName || !currType ||!description) 
                throw new Error('All input fields are marked as required!');

            if(price <= 0 || quantity <= 0) throw new Error('Bad input!');

            console.log('Submitting form response...');
            const imageResponse = await ipfs.add(buffer);
            const data = { 
                name: productName, 
                description,
                type: currType, 
                price: await priceConverter(web3, price), 
                quantity,
                reviews: 'hello world',
                images: [`https://ipfs.io/ipfs/${imageResponse.path}`] 
            };

            const response = await ipfs.add(JSON.stringify(data));
            const link = `https://ipfs.io/ipfs/${response.path}`;
            const newProduct = await createNewProduct(link);
            const event = Object.keys(newProduct.events);
            const id = newProduct.events[event].returnValues._id;
            const product = await findProductById(id);
            console.log('response', response)
            console.log('link', link)
            console.log(product)
            // history.push(`/products/${product._productID}`)

        } catch (error) { console.log(error) }
    }

    return (
        <FormContainer className='center form-container'>
            <form className="center form-group" onSubmit={handleSubmit}>
                <div className="brand">
                    <h2 className="center">Create new product</h2>
                </div>
                <div className="center">
                    <input 
                        value={productName}
                        type="type" 
                        id='productName' 
                        placeholder='Product name' 
                        onChange={e => setProductName(e.target.value)}
                    />
                </div>
                <div className="center">
                    <select value={selectValue} onChange={handleSelectChange}>
                        { getCategory().map(item => <option key={item}>{item}</option>) }
                    </select>
                    <button type='button' className='custom-type-btn' onClick={() => setCustomType(!customType)}>
                        {customType ? 'Hide custom type' : 'Add custom type'}
                    </button>
                </div>
                <div className={customType ? "center" : "hide"}>
                    <input 
                        value={type}
                        type="text" 
                        id='type' 
                        placeholder='Enter a new type' 
                        onChange={e => setType(e.target.value)}
                    />
                </div>
                <div className="center main">
                    <input 
                        value={price}
                        type="number" 
                        placeholder='1 ether' 
                        onChange={e => setPrice(e.target.value)}
                    />
                    <input 
                        value={quantity}
                        min='0'
                        type="number" 
                        placeholder='200 qunatities' 
                        onChange={e => setQuantity(e.target.value)}
                    />
                </div>
                <div className="center">
                    <textarea 
                        cols="30" 
                        rows="10" 
                        value={description}
                        placeholder='Description' 
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="center">
                    <div>
                        <input type="file" className='real-btn' hidden />
                        <button type='button' className='custom-button' onClick={() => handleFileUpload(setBuffer)}>
                            CHOOSE A FILE
                        </button>
                        <small className='custom-text'>No file choosen yet</small>
                    </div>
                </div>
                <div className="center">
                    <button type='submit' className="btn">Create product</button>
                </div>
                <div className="center">
                    <p>
                        Already have an account? 
                        <Link to='/login'>Login</Link>
                    </p>
                </div>
            </form>
        </FormContainer>
    )
}
export default ErrorBoundary(withRouter(CreateNewProduct))