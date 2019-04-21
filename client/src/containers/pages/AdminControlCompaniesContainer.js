import { connect} from 'react-redux';
import { asyncChangeStatusUser, asyncGetControlUsers} from '../../actions/adminActions';
import {ControlCompanies as ControlCompaniesComponent} from '../../components/Admin/ControlsAdmin';

const mapStateToProps = (state) => ({
    docs: state.users.docs || [],
    total: state.users.total || 0,
    page : state.users.page || 0,
    pages : state.users.pages || 0,
    isLoading: state.loading.LIST_CONTROL_LOAD
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeStatusCompany: ({block, message}, id,role) => {
            dispatch(asyncChangeStatusUser({block, message}, id,role));
        },
        getCompaniesControl: (query,role) => {
            dispatch(asyncGetControlUsers(query,role));
        }
    }
};

export const ControlCompanies = connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlCompaniesComponent);
