import React, { Component } from "react";
import { ButtonLink } from "../common/buttons";
import { roles } from "../../utils";

export default function ButtonsProfile({ role }) {
  if (role === roles.admin) {
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
        <ButtonLink name="Управление пользователями" to="/admin/users" />
      </div>
    );
  }
  if (role === roles.user) {
    return (
      <div>
        <ButtonLink
          name="Редатировать профиль"
          margin="left"
          to="/profile/edit"
        />
        <ButtonLink name="Заказы" margin="left" to="/profile/orders" />
        <ButtonLink
          name="Сменить пароль"
          // dark={true}
          to="/profile/edit/password"
        />
      </div>
    );
  }

  if (role === roles.executor) {
    return (
      <div>
        <ButtonLink
          name="Редатировать профиль"
          to="/profile/edit"
          margin="left"
          // dark={true}
        />
        <ButtonLink name="Заказы" margin="left" to="/profile/orders" />
        <ButtonLink
          name="Сменить пароль"
          // dark={true}
          to="/profile/edit/password"
        />
      </div>
    );
  }
}
