import { connect} from 'react-redux';
import { asyncChangeStatusCompany, asyncGetControlCompanies} from '../../actions/adminActions';
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
        changeStatusCompany: ({block, message}, id) => {
            dispatch(asyncChangeStatusCompany({block, message}, id));
        },
        getCompaniesControl: (query) => {
            dispatch(asyncGetControlCompanies(query));
        }
    }
};

export const ControlCompanies = connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlCompaniesComponent);
