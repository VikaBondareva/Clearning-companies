import { connect} from 'react-redux';
import { asyncLogin } from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
import {LoginComponent} from '../../components/Auth/Login';

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    error: state.error.message,
    isSendCode: state.auth.isSendCode,
    isSendEmail: state.auth.isSendEmail,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (user,isExecutor) => {
            dispatch(asyncLogin(user,isExecutor));
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
