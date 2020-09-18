import styled from 'styled-components';
import defaultBcg from '../../assets/blog/blog-home-banner.jpg';


export const ProfilePhoto = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    margin: 0 auto;
    background: linear-gradient(to right, rgba(0,0,0, .5), rgba(0,0,0, .5)),
        url(${props => props.image ? props.image : defaultBcg}) center/cover no-repeat;
    width: 225px;
    height: 225px;
    margin-top: 27.5vh;
    border-radius: 100%;
`