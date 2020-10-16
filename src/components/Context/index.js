import React, { createContext, Component } from "react";
import Web3 from 'web3';
import { abi, networks } from "../../contracts/MyContract.json";

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

            carts: [],
            customSearchValue: '',
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
            // cancel autorefresh on network change
            window.ethereum.autoRefreshOnNetworkChange = false;

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

        // Get cart items
        // const carts = this.getCartProduct(contract, web3, user);

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
            featuredProducts,
            carts: products
        });
    }

    // load all products
    loadAllProducts = async (contract, web3, productCount) => {
        let products = [];

        for(let i = 1; i <= productCount; i++) {
            const currentProduct = await contract.methods.findProduct(i).call();
            const { id, seller, details, price, featured } = currentProduct;
            const product = await (await fetch(details)).json();

            const userDetails = await contract.methods.findUserByAddress(seller).call();
            const sellerName = (await (await fetch(userDetails.details)).json()).username;

            const data = { 
                ...product,
                price: web3.utils.fromWei(price, 'ether'),
                featured,
                seller: sellerName,
                sellerAddress: seller,
                id, 
            };
            products = [...products, data];
        }
        return products;
    }

    // Create new user account
    createNewAccount = async details => {
        try {
            const { contract, user, web3 } = this.state;
            console.log('submiting account details');

            const reciept = await contract.methods.createNewAccount(details).send({
                from: user,
                gas: web3.utils.toBN(180000)
            });

            console.log('Registration successful');
            return reciept;

        } catch (error) { console.log(error.message) }
    }
 
    // Update User profile
    updateAccountDetails = async details => {
        const { contract, user, web3 } = this.state;
        return contract.methods.updateAccountDetails(details).send({
            from: user,
            gas: web3.utils.toBN(250000)
        });
    }

    // find user by address
    findUserByAddress = async (account, { contract } = this.state) => {
        return await contract.methods.findUserByAddress(account).call();
    }

    // login user
    login = userData => this.setState({ isLoggedIn: true, userData });

    // Create new products
    createNewProduct = async (details, price) => {
        const { contract, user, web3 } = this.state;
        return await contract.methods.createNewProduct(details, price).send({
            from: user,
            gas: web3.utils.toBN(250000)
        });
    }

    // Update product
    updateProduct = async data => {
        const { contract, user, web3 } = this.state;
        const { id, price, details } = data;
        return await contract.methods.updateProduct(id, price, details).send({
            from: user,
            gas: web3.utils.toBN(250000)
        });
    }

    // featured products
    featuredProducts = async products => {
        const featuredProducts = products.map(product => product.featured === true);
        this.setState({ featuredProducts });
    }

    // Get cart product
    getCartProduct = async (contract, user) => {
        const carts = contract.methods.findCartProduct(user).call();
        this.setState({ carts })
    }

    findProductById = async (id, { contract } = this.state) => {
        return await contract.methods.findProduct(id).call();
    }
    
    // find product by id
    getSlug = id => this.state.products.find(product => product.id === id);

    // Get unique category
    getCategory = (value = "all", { products } = this.state) => {
        const category = products.reduce((prev, next) => {
            if(!prev.includes(next.category)) prev = [...prev, next.category];
            return prev
        }, [value]);

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
        }

        const tempItem = products.filter(item => item.category === currentValue);
        this.setState({selectValue: currentValue, sortedProducts: tempItem});
    }

    handleCustomSearch = (e, { products } = this.state) => {
        const value = e.currentTarget.value;
        this.setState({ customSearchValue: value });
        if(!value) return;
        if(value.includes('@')) {
            const data = value.replace('@', '');
            const searchBySeller = products.filter(product => product.seller.includes(data));
            this.setState(
                { sortedProducts: searchBySeller }, 
                () => console.log(this.state.sortedProducts)
            );
            return;
        }
        const searchByCategory = products.filter(product => product.category.includes(value));
        const searchByName = products.filter(product => product.name.includes(value));
        const sortedProducts = Array.from(new Set([...searchByName, ...searchByCategory]));
        this.setState({ sortedProducts }, () => console.log(this.state.sortedProducts));
    }

    // Add items to cart
    handleAddtoCart = (id, { products, carts } = this.state) => {
        console.log(this.inCart(id))
        if(this.inCart(id)) return this.removeCartItem(id);

        const product = products.find(product => product.id === id);
        const newCart = [...carts, product];
        newCart.find(cart => cart.id === id).quantity = 1;
        this.setState({ carts: newCart })
    }

    inCart = (id, { carts } = this.state) => {
        const product = carts.find(cart => cart.id === id);
        if(!product) return false;
        return true
    }

    removeCartItem = id => {
        const carts = this.state.carts.filter(product => product.id !== id);
        this.setState({ carts })
    }

    handleQuantityChange = (id, { carts } = this.state) => value => {
        const product = carts.find(product => product.id === id);
        if(product.quantity < 1) return this.removeCartItem(id);
        value === "increment"
            ? product.quantity += 1
            : product.quantity -= 1
        this.setState({ carts })
    }

    render() {

        const {
            createNewAccount, 
            updateAccountDetails,
            findUserByAddress,
            login,

            createNewProduct,
            findProductById,

            getCartProduct,
            inCart,
            handleAddtoCart,
            removeCartItem,

            getSlug,
            getCategory,
            handleSelectChange,
            handleQuantityChange,
            handleCustomSearch
        } = this;

        return (
            <web3Context.Provider value= {{
                ...this.state,
                createNewAccount, 
                updateAccountDetails,
                findUserByAddress,
                login,

                createNewProduct,
                findProductById,

                getCartProduct,
                inCart,
                handleAddtoCart,
                removeCartItem,

                getSlug,
                getCategory,
                handleSelectChange,
                handleQuantityChange,
                handleCustomSearch
            }}>
                {this.props.children}
            </web3Context.Provider >
        )
    }
}

export { web3Context, Web3Provider }