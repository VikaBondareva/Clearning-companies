import React from "react";
import { Link } from "react-router-dom";
import "./style.css";


export default class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      menus: [
        {
          name: "Основное",
          items: [
            {
              name: "Главная",
              href: "/"
            }
          ]
        },
        {
          name: "Аккаунт",
          items: [
            {
              name: "Создать аккаунт",
              href: "/register"
            },
            { name: "Войти", href: "/login" }
          ]
        },
      ]
    };
  }

  renderMenu(menu){
    return (
        <div className="menu footer__menu" key={menu.name}>
            <p className="title-menu">{menu.name}</p>
            <nav className="items-menu">
            {menu.items.map((item,i) => {
                return (
                    <p key={i}><Link className="item" to={item.href}>{item.name}</Link></p>
                );
            })}
            </nav>
      </div>
      );
  }

  render() {
    return (
        <footer className="footer root__footer">
          <nav className="footer-nav">
            {this.state.menus.map(this.renderMenu)}
          </nav>
        </footer>
    );
  }
}
