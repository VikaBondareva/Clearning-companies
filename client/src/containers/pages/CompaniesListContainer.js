import { connect} from 'react-redux';
import { asyncGetCompanies, asyncGetCompanyById } from '../../actions/companyActions';
import CompaniesListComponent from '../../components/Home/CompaniesListComponent';

const mapStateToProps = (state) => ({
    docs: state.companies.docs,
    page: state.companies.page,
    pages: state.companies.pages,
    total: state.companies.total,
    isLoading: state.loading.COMPANIES_LOAD
});

const mapDispatchToProps = (dispatch, getState) => {
    return {
        getCompanies: (queries) => {
            dispatch(asyncGetCompanies(queries));
        },
        loadCompany: (id)=>{
            dispatch(asyncGetCompanyById(id));
        }
    }
};

export const CompaniesList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompaniesListComponent);
