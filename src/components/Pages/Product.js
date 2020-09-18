import React, { useContext, useState } from 'react';
import { FcFilledFilter } from "react-icons/fc";
import { Banner } from "../Banner";
import { ErrorBoundary } from "../ErrorBoundary";
import { web3Context } from "../Context";
import { Header } from "../Header";
import { BackgroundStyle } from "../BackgroundStyle";
import { Filter } from "../Filter";
import Card from '../Card'
import background from "../../assets/facilities/hero.jpeg";

export function Product() {
    const [filterState, setFilterState] = useState(false);
    const web3Consumer = useContext(web3Context);
    const { selectValue, handleSelectChange, getCategory, sortedProducts } = web3Consumer;

    return (
        <div className='center product'>
            <BackgroundStyle className='center' background={background} >
                <Banner btnText='browse our courses' />
            </BackgroundStyle>
            <Header title='Featured courses'>
                <select value={selectValue} onChange={handleSelectChange}>
                    { getCategory().map(item => <option key={item}>{item}</option>) }
                </select>
                <FcFilledFilter className='icon' onClick={() => setFilterState(!filterState)} /> 
            </Header>
            <Filter filterState={filterState} />
            <Card cardItem={sortedProducts} />
        </div>
    )
}

export default ErrorBoundary(Product)
