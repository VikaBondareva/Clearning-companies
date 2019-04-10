import { connect} from 'react-redux';
import { asyncGetCurrentProfile } from '../../actions/userActions';
import ProfilePage from '../../components/Profile/ProfilePage';

const mapStateToProps = (state) => ({
    profile: state.auth.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCurrentProfile: () => {
            dispatch(asyncGetCurrentProfile());
        }
    }
};

export const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
