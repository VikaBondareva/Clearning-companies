import { connect} from 'react-redux';
import { asyncGetOrders,asyncDeleteOrder } from '../../actions/orderActions';
import {OrdersPageComponent} from '../../components/Profile/OrdersListPage';

const mapStateToProps = (state) => ({
    orders: state.orders.docs,
    page: state.orders.page,
    pages: state.orders.pages,
    total: state.orders.total,
    servicesCompany: state.auth.profile.services,
    // role: state.auth.role,
    isLoading: state.loading.ORDERS_LIST_LOAD
});

const mapDispatchToProps = (dispatch, getState) => {
    return {
        getOrders: (queries) => {
            dispatch(asyncGetOrders(queries));
        },
        deleteOrder: (id) =>{
            dispatch(asyncDeleteOrder(id));
        }
    }
};

export const OrdersPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrdersPageComponent);
