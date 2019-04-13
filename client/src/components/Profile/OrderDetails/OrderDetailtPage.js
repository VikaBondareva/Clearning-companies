import React, { Component } from "react";
import { Button } from "../../common/buttons";
import Modal from "../../common/modal/ModalInputCompanent";
import Details from "./OrderDetailsForm";
import { Loader } from "../../common/loading";
import { orderStatusesEnum } from "../../../helpers";

export class OrdersDetailsComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowModal: false,
      id: props.match.params.id,
      text: ""
    };

    this.handleClickShowModal = this.handleClickShowModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  componentDidMount() {
    this.props.getOrder(this.state.id);
  }

  handleClickShowModal() {
    this.setState({
      isShowModal: !this.state.isShowModal
    });
  }

  handleClick(status) {
    const { id, text } = this.state;
    console.log(id, status, text);
    this.props.changeStatus(id, status, text);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClickConfirmCanceled = status => {
    const { id, text } = this.state;
    console.log(id, status, text);
    this.props.changeStatus(id, status, text);
    this.handleClickShowModal();
  };

  renderButton(order) {
    if (order && order.status === orderStatusesEnum.Confirmed) {
      return (
        <>
          <Button name="Отменить" onClick={this.handleClickShowModal} />
          <Button name="Сделано" onClick={() => this.handleClick("made")} />
        </>
      );
    }
    if (order && order.status === orderStatusesEnum.Pending) {
      return (
        <>
          <Button name="Отменить" onClick={this.handleClickShowModal} />
          <Button
            name="Подтвердить"
            onClick={() => this.handleClick("confirmed")}
          />
        </>
      );
    }
    return null;
  }

  renderPage(order) {
    const { isShowModal, text } = this.state;
    return (
      <>
        <Details order={order} />
        {this.renderButton(order)}
        {isShowModal && (
          <Modal
            title="Причина отмены заказа"
            description="Напишите причину"
            handleClose={this.handleClickShowModal}
            onChange={this.handleChange}
            onClick={() => this.handleClickConfirmCanceled("canceled")}
            inputName="text"
            inputValue={text}
          />
        )}
      </>
    );
  }

  render() {
    const { order, isLoading } = this.props;
    return <div>{isLoading ? <Loader /> : this.renderPage(order)}</div>;
  }
}
