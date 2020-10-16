import React, { useState, useContext } from 'react';
import { Link, withRouter } from "react-router-dom";
import { web3Context } from "../Context";
import { helperContext } from "../Context/helper";
import { ErrorBoundary } from "../ErrorBoundary";
import { FormContainer } from "./Styles/form.styled";
import { handleFileUpload } from "../Helper/handleFileUpload";
import { ipfs } from "../IPFS_config/ipfs.config";


export function CreateNewProduct({ history }) {
    const [productName, setProductName] =  useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [customType, setCustomType] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const web3Consumer = useContext(web3Context);
    const helperConsumer = useContext(helperContext);

    const { 
        createNewProduct, isLoggedIn, web3, 
        selectValue, handleSelectChange, getCategory, 
    } = web3Consumer;

    const { buffer, setBuffer, priceConverter } = helperConsumer;

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if(!buffer) return setErrorMessage("Please upload products images!");
            if(!isLoggedIn) return history.push('/login');
            let customType;

            type ? customType = type : customType = selectValue;
            if(customType === "all" && customType) {
                return setErrorMessage("Please select or add a new category");
            }
            
            if(!productName && description.length > 0 && description.length <= 950) {
                return setErrorMessage("Product description must not be less than 900 words");
            }

            if(price <= 0 || quantity <= 0) return;
            const convertedPrice = await priceConverter(web3, price);

            console.log('Submitting form response...');
            setLoading(true);
            const imageResponse = await ipfs.add(buffer);
            let data = { 
                name: productName, 
                description,
                category: customType, 
                quantity,
                reviews: 'hello world',
                images: [`https://ipfs.io/ipfs/${imageResponse.path}`] 
            };
            
            const response = await ipfs.add(JSON.stringify(data));
            const details = `https://ipfs.io/ipfs/${response.path}`;
            await createNewProduct(details, convertedPrice);
            window.location.replace("http://localhost:3000/products")
        } catch (error) { console.log(error) }
    }

    return (
        <FormContainer className='center' width='50'>
            <form className="center form-group" onSubmit={handleSubmit}>
                <div className="brand">
                    <h2 className="center">Create new product</h2>
                </div>
                <div className="center">
                    <input 
                        value={productName}
                        type="text" 
                        id='productName' 
                        placeholder='Product name' 
                        onChange={e => setProductName((e.target.value).toLowerCase())}
                    />
                </div>
                <div className="center">
                    <select value={selectValue} onChange={handleSelectChange}>
                        { getCategory("none").map((item, i) => <option key={i}>{item}</option>) }
                    </select>
                    <small className={errorMessage ? "center error-message" : "hide"}>
                        {errorMessage}
                    </small>
                    <button type='button' className='custom-type-btn' onClick={() => setCustomType(!customType)}>
                        {customType ? 'Hide custom category' : 'Add custom category'}
                    </button>
                </div>
                <div className={customType ? "center" : "hide"}>
                    <input 
                        value={type}
                        type="text" 
                        id='type' 
                        placeholder='Enter a new category' 
                        onChange={e => setType((e.target.value).toLowerCase())}
                    />
                    <small className={errorMessage ? "center error-message" : "hide"}>
                        {errorMessage}
                    </small>
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
                    <small className={errorMessage ? "center error-message" : "hide"}>
                        {errorMessage}
                    </small>
                </div>
                <div className="center">
                    <div>
                        <input type="file" className='real-btn' hidden />
                        <button type='button' className='custom-button' onClick={() => handleFileUpload(setBuffer)}>
                            CHOOSE A FILE
                        </button>
                        <small className='custom-text'>No file choosen yet</small>
                    </div>
                    <small className={errorMessage ? "center error-message" : "hide"}>
                        {errorMessage}
                    </small>
                </div>
                <div className="center">
                    <button type='submit' className="btn">
                        { isLoading ? "Loading..." : "Create product" }
                    </button>
                </div>
                <div className={!isLoggedIn ? "center" : "hide"}>
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