import { connect} from 'react-redux';
import {Header} from '../components/Header';
import { asyncLogout } from '../actions/authActions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(asyncLogout());
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
