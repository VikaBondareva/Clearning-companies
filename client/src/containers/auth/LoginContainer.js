import { connect} from 'react-redux';
import { Login } from '../../actions/authActions';
import {LoginComponent} from '../../components/Auth/Login';

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

export const LoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);
