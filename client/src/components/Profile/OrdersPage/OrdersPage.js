import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "../style/style.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import FiltersMenu from "../SelectMenu/FilterMenu";
import { parse } from "query-string";
import { querySearch } from "../../../helpers";
import {Loader} from '../../common/loading';
import {Pagination} from '../../common/pager';

class OrdersPage extends Component {
  constructor() {
    super();

    this.state = {
      status: "pending",
      services: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickFind = this.handleClickFind.bind(this);
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
    const pathname = this.props.location.pathname;
    this.props.history.push(`${pathname}/${id}`);
  }

  handleClickFind(){
    const pathname = this.props.location.pathname;
    const queries = querySearch(this.props.history.location.search, this.state);
    this.props.history.push(`${pathname}${queries}`);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  renderTableOrders = (orders, total) => (
    <div>
      <p>Заказов: {total}</p>
      <Table>
        <TableHead>
          <TableCell align="left">Типы слуг</TableCell>
          <TableCell align="left">Дата уборки</TableCell>
          <TableCell align="left">Ожидаемое время начала</TableCell>
          <TableCell align="left">Статус</TableCell>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <TableRow
              key={order._id}
              onClick={() => this.handleClick(order._id)}
              className={
                (this.props.classes.table, this.props.classes.tableRowHover)
              }
            >
              <TableCell align="left">
                {order.services.map(service => service + ", ")}
              </TableCell>
              <TableCell align="left">{order.date}</TableCell>
              <TableCell align="left">{order.startTime}</TableCell>
              <TableCell align="left">{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  render() {
    const { classes, orders, servicesCompany,isLoading,pages,page,total } = this.props;
    const { status, services } = this.state;
    return (
      <div>
        <FiltersMenu
          servicesTypes={servicesCompany}
          onChange={this.handleChange}
          statusValue={status}
          services={services}
        />
        <Button onClick={this.handleClickFind}>
          Найти
        </Button>
        {isLoading ? <Loader />
          : 
            <> 
              {this.renderTableOrders(orders, total)}
              <Pagination pages={pages} page={page}/>
            </>
        }
      </div>
    );
  }
}

OrdersPage.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  servicesCompany: PropTypes.array.isRequired
};

export const OrdersPageComponent = withStyles(styles)(OrdersPage);
