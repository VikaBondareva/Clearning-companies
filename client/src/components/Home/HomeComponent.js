import React, {Component} from 'react';
import CardCompanyComponent from '../CompanyCard/CardCompanyComponent';
import SearchMenu from './SearchForm/SearchMenu';
import { withStyles } from '@material-ui/core/styles';
import Pagination from './PaginationComponent';
import PropTypes from 'prop-types';
// import loadingHOC from '../scommon/loading/loadingHOC';

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
        this.handleClickPagination = this.handleClickPagination.bind(this);
     }

    componentWillMount(){
        this.props.getCompanies();
    }

    handleClickPagination(page){
        this.props.getCompanies(page);
    }

    renderCompany(company){
        return (
                <CardCompanyComponent key={company._id} company={company}/>
        );
    }

    render(){
        const {classes,total, docs, page, pages} = this.props;
        return (
            <>
                <SearchMenu/>
                <section className={classes.main}>
                   <div className={classes.companies}>
                       <div className={classes.total}>
                             Найдено: {total}
                        </div>
                         <div style={{margin: "20px 0"}}>
                              {docs.map(this.renderCompany)}
                          </div>
                    </div>
                    <Pagination 
                        handleClickPagination={this.handleClickPagination}
                        pages={pages}
                        total={page}
                        page={page}
                    />
                </section>
            </>
        );
    }
}

HomeComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    docs: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired
};

export default withStyles(styles)(HomeComponent);
// export default loadingHOC('isLoading')(withStyles(styles)(HomeComponent));
