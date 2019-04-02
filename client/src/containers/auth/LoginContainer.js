import { connect} from 'react-redux';
import { asyncLogin } from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import {LoginComponent} from '../../components/Auth/Login';

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    error: state.error
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (user,redirectTo) => {
            dispatch(asyncLogin(user,redirectTo));
        },
        cleanError: () => {
            dispatch(clearErrors());
        }
    }
};

export const LoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent);
