import { connect} from 'react-redux';
import { asyncGetControlUsers,asyncChangeStatusUser} from '../../actions/adminActions';
import {ControlUsers as ControlUsersComponent} from '../../components/Admin/ControlsAdmin';

const mapStateToProps = (state) => ({
    docs: state.users.docs || [],
    total: state.users.total || 0,
    page : state.users.page || 0,
    pages : state.users.pages || 0,
    isLoading: state.loading.LIST_CONTROL_LOAD
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeStatusUser: ({block, message}, id, role) => {
            dispatch(asyncChangeStatusUser({block, message}, id,role));
        },
        getUsersControl: (query,role) => {
            dispatch(asyncGetControlUsers(query,role));
        }
    }
};

export const ControlUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlUsersComponent);
