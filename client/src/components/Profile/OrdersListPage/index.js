import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TableOrdersCompany from "./OrdersCompany";
import CardOrdersUser from './OrdersUser';
import FiltersMenu from "../SelectMenu/FilterMenu";
import { roles, querySearch, serviceTypes } from "../../../utils";
import { Loader } from "../../common/loading";
import { Pagination } from "../../common/pager";
import { parse } from "query-string";

export class OrdersPageComponent extends Component {
  constructor() {
    super();

    this.state = {
      status: "pending",
      services: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickFind = this.handleClickFind.bind(this);
    this.renderOrderPage = this.renderOrderPage.bind(this);
  }

  componentDidMount() {
    this.props.getOrders(this.props.location.search);
    const params = parse(this.props.location.search);
    if (params.services instanceof Array) {
      params.services = [...params.services];
    } else if (params.services) {
      params.services = [params.services];
    }
    this.setState({
      ...this.state,
      ...params
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.getOrders(this.props.location.search);
    }
  }

  handleClick(id) {
    this.props.history.push(`/profile/orders/${id}`);
  }

  handleClickFind() {
    const pathname = this.props.location.pathname;
    const queries = querySearch(this.props.history.location.search, this.state);
    this.props.history.push(`${pathname}${queries}`);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  renderOrderPage() {
    const { orders, role } = this.props;
    if (role === roles.user) {
        return <CardOrdersUser orders={orders} handleClick={this.props.deleteOrder} />;
    } else
      return (
        <TableOrdersCompany orders={orders} handleClick={this.handleClick} />
      );
  }

  render() {
    const { services, status } = this.state;
    const { total, servicesCompany, isLoading, pages, page } = this.props;
    return (
      <div className="main__section">
        <p className="title_big title_bold">Заказы</p>
        <div className="card-form_flex card-from_blue-white card-from">
          <FiltersMenu
            servicesTypes={servicesCompany}
            onChange={this.handleChange}
            statusValue={status}
            services={services}
          />
          <Button onClick={this.handleClickFind}>Найти</Button>
        </div>
        <main>
          {isLoading ? (
            <Loader />
          ) : (
            <>

              <p>{total > 0 ? `Заказов: ${total}` : "Заказов нет"}</p>
              {total > 0 && (
                <>
                  {this.renderOrderPage()}
                  <Pagination pages={pages} page={page} />
                </>
              )}
            </>
          )}
        </main>
      </div>
    );
  }
}

OrdersPageComponent.propTypes = {
  orders: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  servicesCompany: PropTypes.array.isRequired
};

OrdersPageComponent.defaultProps = {
  servicesCompany: serviceTypes
};
