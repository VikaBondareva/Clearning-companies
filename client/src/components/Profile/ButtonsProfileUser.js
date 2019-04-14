import React, { Component } from "react";
import {ButtonLink} from '../common/buttons';
import {roles}  from '../../utils';

export default function ButtonsProfile({role}){

    if(role === roles.admin){
        return (
            <div>
            <ButtonLink
                name="Редатировать профиль"
                to="/profile/edit"
                margin="left"
            />
            <ButtonLink
                name="Управление компаниями"
                to="/admin/companies"
                margin="left"
            />
               <ButtonLink
                name="Управление пользователями"
                to="/admin/users"
                margin="left"
            />
        </div>
        )
    }
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