import { connect} from 'react-redux';
import { asyncGetCurrentProfile } from '../../actions/userActions';
import ProfilePage from '../../components/Profile/ProfilePage';

const mapStateToProps = (state) => ({
    user: state.auth.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCurrentUser: () => {
            dispatch(asyncGetCurrentProfile());
        }
    }
};

export const Profile = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePage);
