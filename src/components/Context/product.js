import React, { createContext, Component } from 'react'
import data from '../../data';
import cartsItems from '../../data/cart';


const productContext = createContext();

class ProductProvider extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            loading: true,
            products: [],
            sortedProducts: [],
            featuredProducts: [],
            selectValue: 'all',

            carts: []
        }
    }

    componentDidMount() {
        const products = this.formatProducts(data);
        const featuredProducts = this.featuredProducts(products);
        const carts = this.formatProducts(cartsItems)

        console.log(carts)
        this.setState({
            products,
            sortedProducts: products,
            featuredProducts,
            carts,
            loading: false
        });
    }
    
    // Load all product data
    formatProducts = data => {
        const tempItems = data.map(item => {
            const id = item.sys.id;
            const seller = item.sys.seller;
            const images = item.fields.images.map(image => image.fields.file.url);
            return { id, seller, ...item.fields, images };
        })
        return tempItems
    }

    // featured products
    featuredProducts = data => data.filter(item => item.featured === true);

    // find product by id
    findProductById = id => this.state.products.find(item => item.id === id);

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
        if (currentValue === 'all') 
            return this.setState({ 
                selectValue: currentValue, 
                sortedProducts: products 
            });
         else {
            const tempItem = products.filter(item => item.type === currentValue);
            this.setState({selectValue: currentValue, sortedProducts: tempItem});
        }
    }

    removeCartItem = id => {
        const carts = this.state.carts.filter(product => product.id !== id);
        this.setState({ carts })
    }

    handleQuantityChange = (id, { carts } = this.state) => value => {
        const product = carts.find(product => product.id === id);
        if(value === "decrement") {
            product.quantity <= 0 
                ? this.removeCartItem(id)
                : product.quantity -= 1
        } else if(value === "increment") {
            product.quantity += 1;
        }
        this.setState({ carts })
        console.log(carts)
    }

    render() {
        const { 
            findProductById,
            getCategory,
            handleSelectChange,
            removeCartItem,
            handleQuantityChange
        } = this;
        return (
            <productContext.Provider value={{
                ...this.state,
                findProductById,
                getCategory,
                handleSelectChange,
                removeCartItem,
                handleQuantityChange
            }}>
                {this.props.children}
            </productContext.Provider>
        )
    }
}

export { productContext, ProductProvider }
