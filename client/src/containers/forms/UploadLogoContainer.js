import { connect } from "react-redux";
import {
  asyncEditProfile
} from "../../actions/userActions";
import { UploadLogoCompany } from "../../components/Profile/EditProfile/Company/UploadLogoCompany";
import {roles} from '../../utils'

const mapStateToProps = state => ({
  company: state.auth.profile,
  error: state.error.message
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveChanges: (logo) => {
        dispatch(asyncEditProfile(logo, roles.executor, true));
    }
  };
};

export const UploadLogo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadLogoCompany);
