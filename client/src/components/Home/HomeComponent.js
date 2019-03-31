import React, {Component} from 'react';
import CardCompanyComponent from '../CompanyCard/CardCompanyComponent';
import SearchMenu from './SearchForm/SearchMenu';
import apiService from '../../services/companies.service';
import { withStyles } from '@material-ui/core/styles';
import Pagination from './PaginationComponent';
import LoadingHOC from '../common/loading/loadingHOC';

const styles ={
    main: {
        width: "100%",
        background: "white",
        boxSizing: "border-box",
    },
    companies: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: "0 50px"
    }
}

class HomeComponent extends Component {

     constructor(){
         super();

         this.state = {
            companies: [],
            total: '',
            page: "",
            pages: "",

        }
        this.handleClickPagination = this.handleClickPagination.bind(this);
        this.getCompanies = this.getCompanies.bind(this);
     }

    componentDidMount(){
        this.getCompanies();
    }

    getCompanies(page){
        apiService.getCompanies(page)
            .then(response =>{
                console.log(response);
                this.setState({
                    companies: response.data.docs,
                    total: response.data.total,
                    page: response.data.page,
                    pages: response.data.pages
                })
            });
    }

    handleClickPagination(page){
        this.getCompanies(page);
    }

    renderCompany(company){
        return (
                <CardCompanyComponent key={company._id} company={company}/>
        );
    }

    render(){
        return (
            <>
                <SearchMenu/>
                <section className={this.props.classes.main}>
                   <div className={this.props.classes.companies}>
                       <div className={this.props.classes.total}>
                             Найдено: {this.state.total}
                        </div>
                         <div style={{margin: "20px 0"}}>
                              {this.state.companies.map(this.renderCompany)}
                          </div>
                    </div>
                    <Pagination 
                        handleClickPagination={this.handleClickPagination}
                        total={this.state.total}
                    />
                </section>
            </>
        );
    }
}


// export default LoadingHOC('companies')
export default (withStyles(styles)(HomeComponent));