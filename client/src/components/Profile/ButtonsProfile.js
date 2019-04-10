import React, { Component } from "react";
// import Button from "@material-ui/core/Button";
import {ButtonLink} from '../common/buttons';

export default function ButtonsProfile(){

    return (
        <div>
            <ButtonLink
                name="Редатировать профиль"
                to="/profile/edit"
            />
            <ButtonLink
                name="Заказы"
                to="/profile/orders"
            />
               <ButtonLink
                name="Отзывы"
                to="/profile/reviews"
            />
        </div>
    );
}