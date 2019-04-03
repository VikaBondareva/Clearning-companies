import { connect} from 'react-redux';
import { asyncRegisterCompany, saveRegisterInState } from '../../actions/authActions';
import {RegistrationCompanyComponent} from '../../components/Auth/Registration';

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    message: state.auth.message,
    isSendEmail: state.auth.isSendEmail,
    company: state.auth.company || {}
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        registerCompany: (company) => {
            dispatch(asyncRegisterCompany(company));
        },
        saveInState: (company) => {
            dispatch(saveRegisterInState(company))
        }
    }
};

export const RegistrationCompany = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationCompanyComponent);
