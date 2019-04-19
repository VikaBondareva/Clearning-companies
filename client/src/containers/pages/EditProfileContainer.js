import { connect } from "react-redux";
import {
  asyncEditProfile
} from "../../actions/userActions";
import { EditProfilePage } from "../../components/Profile/EditProfile";

const mapStateToProps = state => ({
  profile: state.auth.profile,
  role: state.auth.role,
  error: state.error.message,
  isLoading: state.loading.USER_EDIT
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveChanges: (changedProfile, role,isLogo) => {
      dispatch(asyncEditProfile(changedProfile, role,isLogo));
    }
  };
};

export const EditProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfilePage);
