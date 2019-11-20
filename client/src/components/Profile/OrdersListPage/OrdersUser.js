import React, { Component } from "react";
import PropTypes from "prop-types";
import { CardOrder } from "../../common/card/card-order";
import Modal from "../../common/modal/ModalComponent";

export default class TableOrders extends Component {
  constructor() {
    super();

    this.state = {
      isShowModal: false,
      dateOrder: "",
      companyName: "",
      orderId: ""
    };

    this.renderDetailsOrder = this.renderDetailsOrder.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  handleShowModal(companyName, dateOrder, orderId) {
    this.setState({
      isShowModal: !this.state.isShowModal,
      companyName,
      dateOrder,
      orderId
    });
  }

  renderDetailsOrder(order) {
    return <CardOrder order={order} onClick={this.handleShowModal} />;
  }

  render() {
    const {companyName, dateOrder,orderId} = this.state;
    return (
      <>
        <div>{this.props.orders.map(this.renderDetailsOrder)}</div>
        {this.state.isShowModal && (
          <Modal
            title={`Вы точно хотите отменить заказ в компании ${companyName} на дату ${dateOrder}?`}
            onClick={()=>{
              this.handleShowModal();
              this.props.handleClick(orderId);
            }}
            onClose={this.handleShowModal}
          />
        )}
      </>
    );
  }
}

TableOrders.propTypes = {
  orders: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
};
