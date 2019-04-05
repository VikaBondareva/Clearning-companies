import { connect} from 'react-redux';
import FilterMenuComponent from '../../components/Home/SearchForm/FilterMenu'
import { asyncGetCompanies } from '../../actions/companyActions';
import {saveFilter,clearFilter} from '../../actions/filterActions';

const mapStateToProps = (state) => ({
    perPage: state.filters.perPage || 10,
    city: state.filters.city || "",
    sort: state.filters.sortPrice || "",
    maxPrice:  state.filters.sortPrice ,
    minPrice:  state.filters.sortPrice 
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        searchCompanies: () => {
            dispatch(asyncGetCompanies());
        },
        saveFilter: (name,value) => {
            dispatch(saveFilter(name,value));
        },
        clearFilter: (name) => {
            dispatch(clearFilter(name));
        }
    }
};


export const FilterMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterMenuComponent);
