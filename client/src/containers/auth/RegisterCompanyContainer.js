import { connect} from 'react-redux';
import { RegisterCompany } from '../../actions/authActions';
import RegistrationCompany from '../../components/Auth/Registration/RegistrationCompany';

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    message: state.auth.message,
    isSendEmail: state.auth.isSendEmail
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        registerCompany: (company) => {
            dispatch(RegisterCompany(company));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationCompany);
