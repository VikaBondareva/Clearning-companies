import { connect} from 'react-redux';
import App from '../components/App';
import {asyncGetCurrentProfile} from '../actions/userActions';

const mapStateToProps = (state) => ({
    isLoading: state.companies.isLoading,
    isAuthenticated: state.auth.isAuthenticated
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
