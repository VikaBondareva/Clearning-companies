import { connect} from 'react-redux';
import { asyncGetCompanies } from '../../actions/companyActions';
import HomeComponent from '../../components/Home/HomeComponent';

const mapStateToProps = (state) => ({
    docs: state.companies.docs,
    page: state.companies.page,
    pages: state.companies.pages,
    total: state.companies.total,
    // isLoading: state.companies.isLoading
});

const mapDispatchToProps = (dispatch, getState) => {
    return {
        getCompanies: () => {
            dispatch(asyncGetCompanies());
        }
    }
};

export const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent);
