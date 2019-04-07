import { connect} from 'react-redux';
import {  asyncGetCompany} from '../../actions/companyActions';
import {asyncGetReviews} from '../../actions/reviewsActions'
import CompanyPageComponent from '../../components/CompanyPage/CompanyPageComponent';

const mapStateToProps = (state) => ({
    company: state.companies.company,
    isLoading: state.isLoading 
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCompany: (data) => {
            dispatch(asyncGetCompany(data));
        },
        getReviews: (idCompany, page) => {
            dispatch(asyncGetReviews(idCompany, page));
        }
    }
};

export const CompanyPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyPageComponent);
