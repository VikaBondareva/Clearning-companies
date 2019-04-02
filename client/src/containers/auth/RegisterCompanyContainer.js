import { connect} from 'react-redux';
import { asyncRegisterCompany } from '../../actions/authActions';
import {RegistrationCompanyComponent} from '../../components/Auth/Registration';

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    message: state.auth.message,
    isSendEmail: state.auth.isSendEmail
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        registerCompany: (company) => {
            dispatch(asyncRegisterCompany(company));
        }
    }
};

export const RegistrationCompany = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationCompanyComponent);
