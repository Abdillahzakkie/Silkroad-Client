import React, { useState, useContext } from 'react';
import { web3Context } from "../Context";
import "./index.css";

export function Category() {
    const [inputValue, setInputValue] = useState('');
    const web3Consumer = useContext(web3Context);
    const { selectValue, handleSelectChange, getCategory } = web3Consumer;
    const handleFormSubmit = e => {

    }

    return (
        <div className="center category">
            <div className="center main-category">
                <p>Shop All</p>     
                <form onSubmit={handleFormSubmit} className='center' >
                    <input 
                        type='text' 
                        placeholder='custom search' 
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)} 
                    />
                </form>
                <select value={selectValue} onChange={handleSelectChange}>
                    { getCategory().map(item => <option key={item}>{item}</option>) }
                </select>
            </div>
            <div className="center side-category">
                {/* <h4>categories</h4>
                <div className="center">
                    <div className="center">
                        <p>Men</p>
                        <p>(2,220)</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}