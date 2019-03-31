import React from 'react';

import ApiService from '../../../../services/auth.service';

import './Social.css';

export default function Social(){

    const handleClickVk = () => {
        ApiService.authVkonkte()
            .then((res)=>{
                localStorage.setItem("token", res.data);
                console.log(res);
            })
            .catch((err)=>{
                console.error(err);
            })
    }

    const handleClickGoogle = () => {
        ApiService.authGoogle()
            .then((res)=>{
                localStorage.setItem("token", res.data);
                console.log(res);
            })
            .catch((err)=>{
                console.error(err);
            })
    }

    const handleClickGitHub = () => {
        ApiService.authGitHub()
            .then((res)=>{
                localStorage.setItem("token", res.data);
                console.log(res);
            })
            .catch((err)=>{
                console.error(err);
            })
    }

    return(
            <div className='social'>
                <a  className="img-social social-vk" onClick={handleClickVk}></a>
                <a className="img-social social-google" onClick={handleClickGoogle}></a>
                <a className="img-social social-github" onClick={handleClickGitHub}></a>
            </div>
    );
}