import { connect} from 'react-redux';
import { asyncGetOrderById,asyncChangeStatusOrder } from '../../actions/orderActions';
import {OrdersDetailsComponent} from '../../components/Profile/OrderDetails';

const mapStateToProps = (state) => ({
    order: state.orders.order,
    isLoading: state.loading.ORDER_LOAD
});

const mapDispatchToProps = (dispatch, getState) => {
    return {
        getOrder: (id) => {
            dispatch(asyncGetOrderById(id));
        },
        changeStatus: (id, status, lockMessage = null) => {
            dispatch(asyncChangeStatusOrder(id, status, lockMessage))
        }
    }
};

export const OrdersDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrdersDetailsComponent);
