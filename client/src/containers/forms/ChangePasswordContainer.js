import { connect } from "react-redux";
import {
  asyncEditProfile,
  asyncEditCompanyProfile
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
    changePassword: (user, role) => {
      if (role === roles.executor)
        dispatch(asyncEditCompanyProfile(user));
      else dispatch(asyncEditProfile(user));
    }
  };
};

export const ChangePassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordComponent);
