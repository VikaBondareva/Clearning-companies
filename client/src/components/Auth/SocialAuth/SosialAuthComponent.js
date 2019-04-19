import React from "react";
import { GoogleLogin } from "react-google-login";
import "./Social.css";

export  function SocialComponent({authSocial}) {
  const onFailure = (error) => {
    alert(error);
 };

  return (
    <div className="social">
      <GoogleLogin
        clientId={"263232388667-naii2nto8e34sv3bb7vsp8jf2h8jchbu.apps.googleusercontent.com"}
        onSuccess={(response)=>authSocial("google", response)}
        buttonText="Войти через Google"
        onFailure={onFailure}
      />
    </div>
  );
}
