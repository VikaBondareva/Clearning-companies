import { connect} from 'react-redux';
import { asyncGetCompanies } from '../../actions/companyActions';
import CompaniesListComponent from '../../components/Home/CompaniesListComponent';

const mapStateToProps = (state) => ({
    docs: state.companies.docs,
    page: state.companies.page,
    pages: state.companies.pages,
    total: state.companies.total,
    isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch, getState) => {
    return {
        getCompanies: (queries) => {
            dispatch(asyncGetCompanies(queries));
        }
    }
};

export const CompaniesList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompaniesListComponent);
