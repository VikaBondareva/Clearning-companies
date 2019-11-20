import { connect} from 'react-redux';
import ProfilePage from '../../components/Profile/ProfilePage';

const mapStateToProps = (state) => ({
    profile: state.auth.profile,
});

export const Profile = connect(
    mapStateToProps
)(ProfilePage);
