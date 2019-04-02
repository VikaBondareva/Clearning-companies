import { connect} from 'react-redux';
import {Header} from '../components/Header';
import { authRequest,logoutSuccess } from '../actions/authActions';
import {AuthService} from '../services';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        logout: () => {
            dispatch(authRequest());
            AuthService.logout()
                .then(response=>{
                    console.log(response.data);
                    dispatch(logoutSuccess());
                })
        }
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
