import React from 'react';
import { Link } from "react-router-dom";
import author from '../../assets/about/author.jpg';
import { AboutContainer } from "./Styles/about.styled";

export function About() {
    return (
        <AboutContainer className='center about'>
            <div className="center container">
                <section className="center">
                    <img src={author} alt="author"/>
                </section>
                <section className="center">
                    <h5>about me</h5>
                    <h1>personal details</h1>
                    <p>
                        Here, I focus on a range of items and features that we use in life without 
                        giving them a second thought. such as Coca Cola. Dolor sit amet, consectetur adipisicing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                    </p>
                    <button className='btn'>
                        <Link to='/portfolio'>support</Link>
                    </button>
                </section>
            </div>

            <div className="center description">
                <p>
                    It won’t be a bigger problem to find one video game lover in your neighbor. 
                    Since the introduction of Virtual Game, 
                    it has been achieving great heights so far as 
                    its popularity and technological advancement are concerned. 
                    The history of video game is as interesting as a fairy tale.
                </p>
                <p>
                    The quality of today’s video game was not at all there when video game first conceptualized and played ever. 
                    During the formulative years, video games were created by using various interactive electronic devices with various display formats. 
                    The first ever video game was designed in 1947 by Thomas T. Goldsmith Jr.
                </p>
            </div>
        </AboutContainer>
    )
}

export default About
