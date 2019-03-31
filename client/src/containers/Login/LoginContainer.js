import { connect} from 'react-redux';
import { Login } from '../../actions/authActions';
import LoginComponent from '../../components/Auth/Login/Login';

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    message: state.auth.message
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (user,redirectTo) => {
            dispatch(Login(user,redirectTo));
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);
