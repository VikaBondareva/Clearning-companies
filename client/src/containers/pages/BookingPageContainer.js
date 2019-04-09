import { connect} from 'react-redux';
import { asyncCreateOrder, saveOrderInStore } from '../../actions/orderActions';
import {BookingPage} from '../../components/Booking';

const mapStateToProps = (state) => ({
    company: state.companies.company,
    user: state.auth.profile,
    error: state.error.message,
    isLoading: state.isLoading
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
