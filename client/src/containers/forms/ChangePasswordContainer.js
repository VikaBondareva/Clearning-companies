import { connect } from "react-redux";
import {
  asyncChangePassword,
  asyncChangeCompanyPassword
} from "../../actions/userActions";
import {roles} from '../../utils'
import { ChangePassword as ChangePasswordComponent } from "../../components/Profile/EditProfile/ChangePassword";

const mapStateToProps = state => ({
  profile: state.auth.profile,
  role: state.auth.role,
  error: state.error.message,
  isLoading: state.loading.USER_EDIT_PASSWORD
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePassword: (passwords, role) => {
      if (role === roles.executor)
        dispatch(asyncChangeCompanyPassword(passwords));
      else dispatch(asyncChangePassword(passwords));
    }
  };
};

export const ChangePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordComponent);
