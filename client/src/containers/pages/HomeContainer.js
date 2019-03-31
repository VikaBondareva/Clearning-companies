import { connect} from 'react-redux';
import { companiesRequest, companiesSuccess, GetCompanies } from '../../actions/companyActions';
import HomeComponent from '../../components/Home/HomeComponent';
import companiesService from '../../services/companies.service';

const mapStateToProps = (state) => ({
    docs: state.companies.docs,
    page: state.companies.page,
    pages: state.companies.pages,
    total: state.companies.total
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getCompanies: () => {
            dispatch(companiesRequest());
            companiesService.getCompanies()
                .then(response=>{
                    console.log(response.data);
                    dispatch(companiesSuccess(response.data));
                })
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeComponent);
