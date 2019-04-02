import { connect} from 'react-redux';
import {  asyncGetCompanyById} from '../../actions/companyActions';
import CompanyPageComponent from '../../components/CompanyPage/CompanyPageComponent';

const mapStateToProps = (state) => ({
    company: state.companies.company
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCompany: (id) => {
            dispatch(asyncGetCompanyById(id));
        }
    }
};

export const CompanyPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyPageComponent);
