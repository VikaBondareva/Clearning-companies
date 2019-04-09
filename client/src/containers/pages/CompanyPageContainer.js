import { connect} from 'react-redux';
import {  asyncGetCompany} from '../../actions/companyActions';
import {asyncGetReviews,asyncCreateReview } from '../../actions/reviewsActions'
import CompanyPageComponent from '../../components/CompanyPage/CompanyPageComponent';

const mapStateToProps = (state) => ({
    company: state.companies.company,
    isLoading: state.isLoading,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCompany: (data) => {
            dispatch(asyncGetCompany(data));
        },
        getReviews: (idCompany, page) => {
            dispatch(asyncGetReviews(idCompany, page));
        },
        createReview: (review) => {
            dispatch(asyncCreateReview(review));
        }
    }
};

export const CompanyPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyPageComponent);
