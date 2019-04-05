import { connect} from 'react-redux';
import App from '../components/App';
import {asyncGetCurrentProfile} from '../actions/userActions';

const mapStateToProps = (state) => ({
    isLoading: state.companies.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    // role: state.auth.profile? state.auth.profile.role : null
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadUser: () => {
            dispatch(asyncGetCurrentProfile());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
