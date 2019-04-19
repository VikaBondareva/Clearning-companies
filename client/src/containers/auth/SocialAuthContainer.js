import { connect} from 'react-redux';
import { asyncSocialAuth } from '../../actions/authActions';
import {SocialComponent} from '../../components/Auth/SocialAuth/SosialAuthComponent';

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        authSocial: (provider,token) => {
            dispatch(asyncSocialAuth(provider,token));
        },
    }
};

export const Social = connect(
    null,
    mapDispatchToProps
)(SocialComponent);
