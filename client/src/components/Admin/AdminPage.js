import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ModalInput from "../common/modal/ModalInputCompanent";
import Modal from "../common/modal/ModalComponent";
import { querySearch } from "../../utils";
import FiltersMenu from "./FilersMenuAdmin";
import { Pagination } from "../common/pager";
import { Loader } from "../common/loading";
import Table from "./ControlsAdmin/TableUserComponent";

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpedModalBlock: false,
      isOpedModalUnblock: false,
      message: "",
      status: 1,
      block: false,
      id: ""
    };

    this.handleClickShowModal = this.handleClickShowModal.bind(this);
    this.handleClickConfirmBlock = this.handleClickConfirmBlock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickFind = this.handleClickFind.bind(this);
  }

  componentDidMount() {
    const search = this.props.location.search;
    this.props.loadListControl(search);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.loadListControl(this.props.location.search);
    }
  }

  handleClickShowModal(name) {
    this.setState({
      [name]: !this.state[name]
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(status, id, messageLock = null) {
    this.setState({ id, messageLock });
    if (status === "block") {
      this.handleClickShowModal("isOpedModalBlock");
    } else if (status === "unblock") {
      this.handleClickShowModal("isOpedModalUnblock");
    }
  }

  handleClickConfirmBlock(status, message, nameIsOpen) {
    let data = { block: status };
    if (message) {
      data.message = message;
    }
    this.props.changeStatus(data, this.state.id);
    this.handleClickShowModal(nameIsOpen);
  }

  handleClickFind() {
    const { status } = this.state;
    const pathname = this.props.match.path;
    const query = querySearch("", { status });
    this.props.history.push(pathname + query);
  }

  render() {
    const { page, pages, isLoading, docs, total, role } = this.props;
    const { status, message, messageLock } = this.state;
    return (
      <section className="main__section section">
        <FiltersMenu
          onClick={this.handleClickFind}
          onChange={this.handleChange}
          value={status}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Table
              list={docs}
              total={total}
              role={role}
              handleClickStatus={this.handleClick}
            />
            <Pagination pages={pages} page={page} />
            {this.state.isOpedModalBlock && (
              <ModalInput
                title="Причина блокировка"
                description="Напишите причину"
                handleClose={() =>
                  this.handleClickShowModal("isOpedModalBlock")
                }
                onChange={this.handleChange}
                onClick={() =>
                  this.handleClickConfirmBlock(
                    true,
                    message,
                    "isOpedModalBlock"
                  )
                }
                inputName="message"
                inputValue={message}
              />
            )}
            {this.state.isOpedModalUnblock && (
              <Modal
                title={"Вы точно хотите разблокировать пользователя?"}
                description={`Причина блокировки: ${messageLock}`}
                onClick={() =>
                  this.handleClickConfirmBlock(
                    false,
                    null,
                    "isOpedModalUnblock"
                  )
                }
                onClose={() => this.handleClickShowModal("isOpedModalUnblock")}
              />
            )}
          </>
        )}
      </section>
    );
  }
}

export const AdminPageComponent = withRouter(AdminPage);
