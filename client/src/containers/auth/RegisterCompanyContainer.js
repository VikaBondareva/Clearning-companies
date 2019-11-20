import { connect} from 'react-redux';
import { asyncRegisterUser, saveRegisterInState } from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import {roles} from '../../utils';
import {RegistrationCompanyComponent} from '../../components/Auth/Registration';

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    isSendEmail: state.auth.isSendEmail,
    company: state.auth.company || {},
    error: state.error.message,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        registerCompany: (company) => {
            dispatch(asyncRegisterUser(company,roles.executor));
        },
        saveInState: (company) => {
            dispatch(saveRegisterInState(company))
        },
        cleanError: ()=> {
            dispatch(clearErrors());
        }
    }
};

export const RegistrationCompany = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationCompanyComponent);
