import React from 'react';
// import io from 'socket.io-client';
// import OAuth from './OAuth';
import {AuthService} from '../../../services';
import './Social.css';
// const providers = ['google', 'github', 'vkontakte'];
// const socket = io('https://localhost:7040')

export default function Social(){

    const handleClickVk = () => {
        AuthService.authVkonkte()
            .then((res)=>{
                localStorage.setItem("token", res.data);
                console.log(res);
            })
            .catch((err)=>{
                console.error(err);
            })
    }

    const handleClickGoogle = () => {
        AuthService.authGoogle()
            .then((res)=>{
                localStorage.setItem("token", res.data);
                console.log(res);
            })
            .catch((err)=>{
                console.error(err);
            })
    }

    const handleClickGitHub = () => {
        AuthService.authGitHub()
            .then((res)=>{
                localStorage.setItem("token", res.data);
                console.log(res);
            })
            .catch((err)=>{
                console.error(err);
            })
    }

    // const buttons = (providers, socket) => {
    //     providers.map(provider => 
    //         <OAuth 
    //             provider={provider}
    //             key={provider}
    //             // socket={socket}
    //         />
    //     )
    // }

    return(
            <div className='social'>
                {/* {buttons(providers, socket)} */}
                <a  className="img-social social-vk" onClick={handleClickVk}></a>
                <a className="img-social social-google" onClick={handleClickGoogle}></a>
                <a className="img-social social-github" onClick={handleClickGitHub}></a>
            </div>
    );
}