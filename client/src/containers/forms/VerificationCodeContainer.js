import { connect } from "react-redux";
import { asyncConfirmEmail,asyncSendNewVerificationCode } from "../../actions/authActions";
import { roles } from "../../utils";
import { VerificationCodeForm } from "../../components/Auth/VerificationComponent";

const mapStateToProps = state => ({
  email: state.auth.email,
  error: state.error.message,
  isLoading: state.loading.EMAIL_CONFIRM
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendVerificationCode: ({ email, verificationCode }) => {
      dispatch(asyncConfirmEmail({ email, verificationCode }, roles.user));
    },
    sendNewVerificationCode: (email) => {
        dispatch(asyncSendNewVerificationCode(email));
    }
  };
};

export const VerificationCode = connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationCodeForm);
