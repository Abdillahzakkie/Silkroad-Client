import React, { createContext, Component } from "react";
import Web3 from 'web3';
import { abi, networks } from "../../contracts/ProductContract.json";

const web3Context = createContext();

class Web3Provider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loading: true,
            web3: null,
            user: null,
            contract: null,
            isLoggedIn: false,
            userData: null,

            products: [],
            sortedProducts: [],
            featuredProducts: [],
            productCount: 0,
            selectValue: 'all',
        }
    }

    async componentDidMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    // loadWeb3
    loadWeb3 = async () => {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("Non-Ethereum browser detected. You should consider trying Metamask")
        }
        // window.web3 = new Web3('http://127.0.0.1:7545')
        // console.log(window.web3)
    }

    // load blockchain data
    loadBlockchainData = async () => {
        const web3 = window.web3;
        const network_id = await web3.eth.net.getId();
        const deployedContract = networks[network_id];
        const contract = new web3.eth.Contract(abi, deployedContract.address);

        const accounts = await web3.eth.getAccounts();
        const user = accounts[0];

        // Get product count from smart contract
        const productCount = await contract.methods.productCount().call();

        // Load all products from smart contract
        const products = await this.loadAllProducts(contract, web3, productCount);

        // Get all featured products
        const featuredProducts = this.featuredProducts(products);

        let isUserLoggedIn = localStorage.getItem('isLoggedIn');
        isUserLoggedIn = JSON.parse(isUserLoggedIn);
        if(isUserLoggedIn) {
            let userData = localStorage.getItem('userData');
            userData = JSON.parse(userData);
            userData !== null && this.setState({ isLoggedIn: true, userData });
        }

        this.setState({ 
            loading: false,
            web3, 
            user,
            contract, 
            productCount, 
            products, 
            sortedProducts: products,
            featuredProducts
        });
    }

    // Get User hash
    getUserData = async (account, { contract, user } = this.state) => 
        account 
            ? await contract.methods.findUserByAddress(account).call()
            : await contract.methods.findUserByAddress(user).call();

    // login user
    login = userData => this.setState({ isLoggedIn: true, userData });

    // Create new user account
    createNewAccount = async hash => {
        try {
            const { contract, user, web3 } = this.state;
            console.log('submiting account details');

            const reciept = await contract.methods.createNewAccount(hash).send({
                from: user,
                gas: web3.utils.toBN(180000)
            });

            console.log('Registration successful');
            return reciept;

        } catch (error) { console.log(error.message) }
    }
 
    // Update User profile
    updateAccountDetails = async data => {
        const { contract, user, web3 } = this.state;
        return contract.methods.updateAccountDetails(data).send({
            from: user,
            gas: web3.utils.toBN(250000)
        });
    }

    // Create new products
    createNewProduct = async productDetails => {
        const { contract, user, web3 } = this.state;
        return await contract.methods.createNewProduct(productDetails).send({
            from: user,
            gas: web3.utils.toBN(250000)
        });
    }

    // load all products
    loadAllProducts = async (contract, web3, productCount) => {
        let products = [];

        for(let i = 1; i <= productCount; i++) {
            const currentProduct = await contract.methods.findProduct(i).call();
            const { _productDetails, _productId, _seller } = currentProduct;
            const response = await (await fetch(_productDetails)).json();
            const data = { 
                ...response,
                price: web3.utils.fromWei(response.price, 'ether'),
                _seller, 
                id: _productId, 
            };
            products = [...products, data];
        }
        return products;
    }

    // featured products
    featuredProducts = async () => {

    }

    findProductById = async (id, { contract } = this.state) => await contract.methods.findProduct(id).call();
    
    // find product by id
    getSlug = id => this.state.products.find(item => item.id === id);

    // Get unique category
    getCategory = ({ products } = this.state) => {
        const category = products.reduce((prev, next) => {
            if(!prev.includes(next.type)) { prev.push(next.type) }
            return prev
        }, ['all']);

        return category
    }

    // Handles select option change
    handleSelectChange = (e, { products } = this.state) => {
        // Get current value
        const currentValue = e.currentTarget.value;

        // update 
        if (currentValue === 'all') {
            return this.setState({ 
                selectValue: currentValue, 
                sortedProducts: products 
            });
        } else {
            const tempItem = products.filter(item => item.type === currentValue);
            this.setState({selectValue: currentValue, sortedProducts: tempItem});
        }
    }

    render() {

        const {
            createNewAccount, 
            getUserData, 
            login,
            createNewProduct,
            updateAccountDetails,
            findProductById,
            getSlug,
            getCategory,
            handleSelectChange
        } = this;

        return (
            <web3Context.Provider value= {{
                ...this.state,
                createNewAccount, 
                getUserData, 
                login,
                createNewProduct,
                updateAccountDetails,
                findProductById,
                getSlug,
                getCategory,
                handleSelectChange
            }}>
                {this.props.children}
            </web3Context.Provider >
        )
    }
}

export { web3Context, Web3Provider }