import { connect } from "react-redux";
import {
  asyncEditProfile,
  asyncEditCompanyProfile
} from "../../actions/userActions";
import { EditProfilePage } from "../../components/Profile/EditProfile";
import { roles } from "../../utils";

const mapStateToProps = state => ({
  profile: state.auth.profile,
  role: state.auth.role,
  error: state.error.message
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveChanges: (changedProfile, role) => {
      if (role === roles.executor)
        dispatch(asyncEditCompanyProfile({ ...changedProfile }));
      else dispatch(asyncEditProfile({ ...changedProfile }));
    }
  };
};

export const EditProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfilePage);
