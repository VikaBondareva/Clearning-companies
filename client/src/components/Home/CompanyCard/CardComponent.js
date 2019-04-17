import React, { Component } from "react";
import PropTypes from "prop-types";
import { ButtonLink, Button } from "../../common/buttons";
import companyImg from '../../../static/img/default-company.jpg';
import "./style.css";
import "./styleCard.css";

export default class CardCompanyComponent extends Component {
  constructor() {
    super();
    this.renderWorkPlan = this.renderWorkPlan.bind(this);
  }

  renderWorkPlan(day) {
    return (
      <p key={day.day}>
        {day.day}: {day.start} - {day.end}
      </p>
    );
  }

  render() {
    const {
      name,
      address,
      ratting,
      logoUrl,
      logoName,
      _id,
      workPlan,
      rooms,
      price
    } = this.props.company;
    const imgSrc = logoUrl || companyImg;
    const classImg = logoUrl ? 'img-logo_ulpoad' : 'img-logo_default';
    return (
      <section className="article article_grey card_shadow">
        <div className="header-card">
          <h2 className="title-preview">{name}</h2>
          <div className="card-ratting">
            {ratting}
            <span className="stars stars--large">
              <span style={{ width: `${(ratting / 5.3) * 100}%` }} />
            </span>
          </div>
        </div>
        <div className="preview">
          <div className="review-body">
            <div className="image image_laptop">
               <img className={`img-logo ${classImg}`} src={imgSrc} alt={logoName || "not logo"}/>
            </div>
            <div>
              <p>
                Адрес: {address.country}, {address.city},{" "}
                {address.other && `${address.other}`}
              </p>
              <div>Средняя цена {price}</div>
            </div>
          </div>
          <div className="wrap">
            <div className="wrap__info">
              <p className="excerpt">График работы</p>
              {workPlan.map(this.renderWorkPlan)}
              <div>
                <p className="excerpt">
                  {" "}
                  Цена за маленькую конмнату: {rooms.standart.price} руб
                </p>
                <p className="excerpt">
                  Цена за большую конмнату: {rooms.big.price} руб
                </p>
                <p className="excerpt">
                  Цена за туалет : {rooms.toilet.price} руб
                </p>
              </div>
            </div>
            <div className="wrap__btns">
              {this.props.isShowBtn && (
                <Button
                  name="Заказать услугу"
                  onClick={() => this.props.onClick(_id)}
                  to={`/companies/${_id}`}
                  className="preview__btn-control btn-control"
                />
              )}

              <ButtonLink
                name="Подробнее"
                to={`/companies/${_id}`}
                className="preview__btn-control btn-control"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

CardCompanyComponent.propTypes = {
  company: PropTypes.object.isRequired
};
