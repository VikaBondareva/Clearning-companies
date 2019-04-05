import { connect} from 'react-redux';
import SearchFormComponent from '../../components/Home/SearchForm/SearchFormComponent'
import { asyncGetCompanies } from '../../actions/companyActions';
import {saveFilter, clearFilter} from '../../actions/filterActions';

const mapStateToProps = (state) => ({
    name: state.filters.name || "",
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        searchCompanies: () => {
            dispatch(asyncGetCompanies(ownProps.filters));
        },
        saveFilter: (name, value) => {
            dispatch(saveFilter(name, value));
        },
        clearFilter: (name) => {
            dispatch(clearFilter(name));
        }
    }
};


export const SearchForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchFormComponent);
