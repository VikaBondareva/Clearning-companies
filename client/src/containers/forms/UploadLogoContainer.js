import { connect } from "react-redux";
import {
  asyncEditCompanyProfile
} from "../../actions/userActions";
import { UploadLogoCompany } from "../../components/Profile/EditProfile/Company/UploadLogoCompany";

const mapStateToProps = state => ({
  company: state.auth.profile,
  error: state.error.message
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveChanges: (logo) => {
        dispatch(asyncEditCompanyProfile(logo , '/profile', true));
    }
  };
};

export const UploadLogo = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadLogoCompany);
