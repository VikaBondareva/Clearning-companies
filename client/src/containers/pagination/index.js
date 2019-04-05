import { connect} from 'react-redux';
import PaginationComponent from '../../components/Home/PaginationComponent';
import { asyncGetCompanies } from '../../actions/companyActions';

const mapStateToProps = (state) => ({
    pages: state.companies.pages,
    page: state.companies.page
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeListCompanies: (currentPage) => {
            dispatch(asyncGetCompanies(currentPage));
        }
    }
};


export const Pagination = connect(
    mapStateToProps,
    mapDispatchToProps
)(PaginationComponent);
