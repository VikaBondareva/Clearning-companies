import React, { Component } from "react";
import PropTypes from "prop-types";
import { ButtonLink, Button } from "../../common/buttons";
import { WorkPlanCompany } from "../../common/company-forms";
import companyImg from "../../../static/img/default-company.jpg";
import "./style.css";
import "./styleCard.css";

export default function CardCompanyComponent(props) {
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
  } = props.company;
  const imgSrc = logoUrl || companyImg;
  const classImg = logoUrl ? "img-logo_ulpoad" : "img-logo_default";
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
            <img
              className={`img-logo ${classImg}`}
              src={imgSrc}
              alt={logoName}
            />
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
            {workPlan[0] && (
              <>
                <p className="excerpt">График работы</p>
                <WorkPlanCompany workPlan={workPlan} />
              </>
            )}
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
            {props.isShowBtn && (
              <Button
                name="Заказать услугу"
                onClick={() => props.onClick(_id)}
                to={`/${_id}`}
                className="preview__btn-control btn-control"
              />
            )}

            <ButtonLink
              name="Подробнее"
              to={`/${_id}`}
              className="preview__btn-control btn-control"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

CardCompanyComponent.propTypes = {
  company: PropTypes.object.isRequired
};
