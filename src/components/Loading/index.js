import React from "react";
import styled from "styled-components";
import loading from "./gif/loading-arrow.gif";


const LoadingContainer = styled.div`
    width: 20vw;
    height: 100%;
    margin: auto;

    & img {
        width: 100%;
    }
`

export function Loading({ preloader }) {
    return (
        <LoadingContainer>
            <img src={preloader || loading} alt='loading' />
        </LoadingContainer>
    )
}