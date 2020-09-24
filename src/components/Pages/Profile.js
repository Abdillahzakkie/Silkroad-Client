import React, { useContext, useEffect } from 'react';
import { ipfs } from "../IPFS_config/ipfs.config";
import { ErrorBoundary } from "../ErrorBoundary";
import { web3Context } from "../Context";
import { helperContext } from "../Context/helper";
import { BackgroundStyle, ProfilePhoto } from "../BackgroundStyle";
import { handleFileUpload } from "../Helper/handleFileUpload";
import './Styles/profile.css';

export function Profile() {
    const web3Consumer = useContext(web3Context);
    const helperConsumer = useContext(helperContext);

    const { userData } = web3Consumer;
    const { buffer, setBuffer, encryptData } = helperConsumer;
    
    const { username, image, encoded } = userData;
    const { email } = encoded;

    useEffect(() => {
        if(!buffer) return;
        (async () => {
            try {
                console.log('Submitting form response...');
                // Upload encrypted user data to IPFS
                const imageResponse = await ipfs.add(buffer);
                // Encrypt user data
                const encodedUserData = encryptData(JSON.stringify({
                    ...userData.encoded
                }), userData.encoded.password);

                const data = {
                    ...userData,
                    encoded: encodedUserData,
                    image: `https://ipfs.io/ipfs/${imageResponse.path}` 
                }

                const response = await ipfs.add(JSON.stringify(data));
                const link = `https://ipfs.io/ipfs/${response.path}`;
                console.log(link)
    
            } catch (error) { console.log(error) }
        })()
    }, [buffer, userData, encryptData])

    return (
        <div className='center profile'>
            <BackgroundStyle className='center background' height={70}>
                <ProfilePhoto image={image} className='center online'>
                    {/* <button className='center'>Upload</button> */}
                    <input type="file" className='real-btn' hidden />
                    <button className='center custom-button' onClick={() => handleFileUpload(setBuffer)}>
                        Upload
                    </button>
                    <small className='custom-text hide'>No file choosen yet</small>
                </ProfilePhoto>
                <h3 className='center'>{username}</h3>
                <p className='center email'>{email}</p>
            </BackgroundStyle>
            <div className="center test">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, non quisquam! Eos totam itaque molestiae delectus consequatur maxime corporis quae! Qui vero dicta facilis illo est veniam, illum unde quam animi recusandae officiis. Adipisci consequuntur excepturi expedita. Id, a deleniti et praesentium perferendis iure ad molestias commodi doloribus beatae, officiis sunt? Sequi ea laudantium deserunt quos qui, doloremque et? Saepe animi quos rerum sequi, incidunt natus dicta accusamus error perspiciatis ipsum voluptas eligendi at laborum deserunt quaerat possimus est officia culpa, perferendis laudantium minus debitis nostrum adipisci? Perspiciatis, laborum quis? Quasi incidunt enim alias voluptatem culpa reiciendis quae. Magni numquam ipsa distinctio quibusdam voluptatum laborum exercitationem, nulla corporis repudiandae iusto deleniti labore. Nemo odit iure cupiditate quis voluptatem quod! Nesciunt cumque placeat nulla at repudiandae, nobis corrupti. Ipsum debitis voluptatum tempore, animi sapiente nemo ab cupiditate blanditiis necessitatibus nobis voluptate? Similique obcaecati sequi quas optio temporibus quos alias possimus, molestias ab a iure cumque ducimus accusantium laboriosam qui nesciunt, et rerum nam voluptate magni sit ut amet. Repellendus obcaecati eligendi debitis enim vero consequuntur, quaerat eum nam. Accusamus commodi itaque at, nulla, provident cumque quod impedit repudiandae ex a laborum, neque cupiditate incidunt? Commodi, voluptate dicta. Pariatur, dignissimos sint. Libero.
            </div>
        </div>
    )
}

export default ErrorBoundary(Profile)
