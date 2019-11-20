import { connect} from 'react-redux';
import { asyncCreateOrder, saveOrderInStore } from '../../actions/orderActions';
import {BookingPage} from '../../components/Booking';

const mapStateToProps = (state) => ({
    company: state.companies.company,
    userAddress: state.auth.profile? state.auth.profile.addresses : "",
    error: state.error.message,
    order: state.orders.orderCreate || null,
    isLoading: state.loading.COMPANY_LOAD || state.loading.ORDER_CREATE,
    isAuth: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch, getState) => {
    return {
        createOrder: (order) => {
            dispatch(asyncCreateOrder(order));
        },
        saveOrderStore: (order)=> {
            dispatch(saveOrderInStore(order));
        }
    }
};

export const Booking = connect(
    mapStateToProps,
    mapDispatchToProps
)(BookingPage);
