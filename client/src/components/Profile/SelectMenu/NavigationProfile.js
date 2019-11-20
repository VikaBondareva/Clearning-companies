import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { roles } from "../../../utils";
import "./styleNav.css";

export function NavigationProfile({ role, iSicoal }) {
  const renderButton = () => {
    if (role === roles.admin) {
      return (
        <>
          <NavLink exact to="/admin/companies" activeClassName="nav-active">
            Управление компаниями
          </NavLink>
          <NavLink to="/admin/users" activeClassName="nav-active">
            Управление пользователями
          </NavLink>
        </>
      );
    } else {
      return (
        <NavLink exact to="/profile/orders" activeClassName="nav-active">
          Заказы
        </NavLink>
      );
    }
  };

  const ButtonProfile = () => {
    return (
      <>
        <NavLink to="/profile" activeClassName="nav-active" exact>
          Профиль
        </NavLink>
        <NavLink to="/profile/edit" activeClassName="nav-active" exact>
          Редатировать профиль
        </NavLink>
        {!iSicoal && (
          <NavLink
            exact
            to="/profile/edit/password"
            activeClassName="nav-active"
          >
            Сменить пароль
          </NavLink>
        )}
        {renderButton()}
      </>
    );
  };

  return (
    <div className="profile-buttons navigation">
      <ButtonProfile />
    </div>
  );
}
