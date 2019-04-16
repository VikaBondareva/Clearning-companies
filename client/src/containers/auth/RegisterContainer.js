import { connect} from 'react-redux';
import { asyncRegisterUser } from '../../actions/authActions';
import {roles} from '../../utils';
import {RegistrationUserComponent} from '../../components/Auth/Registration';

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    message: state.auth.message,
    isSendCode: state.auth.isSendCode,
    error: state.error.message
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        registerUser: (user) => {
            dispatch(asyncRegisterUser(user,roles.user));
        }
    }
};

export const RegistrationUser =  connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationUserComponent);
