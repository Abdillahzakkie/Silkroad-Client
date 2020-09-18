import React, { createContext, Component } from "react";
import CryptoJS from 'crypto-js';

const helperContext = createContext();

class HelperProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            buffer: null
        }
    }

    // Encrypt data
    encryptData = (data, passcode) => CryptoJS.AES.encrypt(data, passcode).toString();

    // Decrypt data
    decryptData = (data, passcode) => {
        return JSON.parse(
            CryptoJS.AES.decrypt(data, passcode).toString(CryptoJS.enc.Utf8)
        );
    }

    // Set buffer
    setBuffer = buffer => this.setState({ buffer })

    // Price converter
    priceConverter = async (web3, price) => await web3.utils.toWei(price, 'ether').toString();

    render() {
        const { 
            encryptData,
            decryptData,
            setBuffer,
            priceConverter
        } = this;

        return (
            <helperContext.Provider value= {{
                ...this.state,
                encryptData,
                decryptData,
                setBuffer,
                priceConverter
            }}>
                {this.props.children}
            </helperContext.Provider >
        )
    }
}

export { helperContext, HelperProvider }