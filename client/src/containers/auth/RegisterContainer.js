import { connect} from 'react-redux';
import { RegisterUser } from '../../actions/authActions';
import Registration from '../../components/Auth/Registration/Registration';

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    message: state.auth.message,
    isSendEmail: state.auth.isSendEmail
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        registerUser: (user) => {
            dispatch(RegisterUser(user));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);
