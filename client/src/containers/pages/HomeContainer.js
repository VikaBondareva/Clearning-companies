import { connect} from 'react-redux';
import { asyncGetCompanies } from '../../actions/companyActions';
import {allFilterClear} from '../../actions/filterActions';
import HomeComponent from '../../components/Home/HomeComponent';

const mapStateToProps = (state) => ({
    docs: state.companies.docs,
    page: state.companies.page,
    pages: state.companies.pages,
    total: state.companies.total,
});

const mapDispatchToProps = (dispatch, getState) => {
    return {
        getCompanies: () => {
            dispatch(asyncGetCompanies());
        },
        clearFilters: () => {
            dispatch(allFilterClear());
        }
    }
};

export const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent);
