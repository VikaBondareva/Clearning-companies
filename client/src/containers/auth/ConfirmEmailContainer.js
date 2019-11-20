import { connect} from 'react-redux';
import { asyncConfirmEmail } from '../../actions/authActions';
import ConfirmEmailComponent from '../../components/Auth/ConfirmEmail/ConfirmEmail';

const mapStateToProps = (state) => ({
    isLoading: state.loading.EMAIL_CONFIRM,
    error: state.error,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        confirmEmail: (token, email) => {
            dispatch(asyncConfirmEmail(token, email));
        },
    }
};

export const ConfirmEmail = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmEmailComponent);
