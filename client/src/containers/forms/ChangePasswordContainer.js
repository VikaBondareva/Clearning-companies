import { connect } from "react-redux";
import {
  asyncEditProfile,
} from "../../actions/userActions";
import { ChangePassword as ChangePasswordComponent } from "../../components/Profile/EditProfile/ChangePassword";

const mapStateToProps = state => ({
  profile: state.auth.profile,
  role: state.auth.role,
  error: state.error.message,
  isLoading: state.loading.USER_EDIT_PASSWORD
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePassword: (user, role) => {
      dispatch(asyncEditProfile(user,role));
    }
  };
};

export const ChangePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordComponent);
