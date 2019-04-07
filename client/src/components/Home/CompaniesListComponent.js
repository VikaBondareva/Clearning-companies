import React, {Component} from 'react';
import CardCompanyComponent from '../CompanyCard/CardCompanyComponent';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Pagination from './PaginationComponent';
import Loader from '../common/loading/loader';
import {withRouter} from 'react-router-dom';

const styles = theme =>({
    companies: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: "0 50px"
    },
    table: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridColumnGap: "30px",
        gridColumn: "1fr 1fr",
        gridRowGap: "30px",
        margin: "20px 0px",
        [theme.breakpoints.down("sm")]: {
             gridTemplateColumns: "1fr",
        },
    },
    pagination:{
        display: "flex",
        justifyContent: "center",
        margin: "10px 0"
    }
})

class CompaniesList extends  Component{

    renderCompany=(company)=>{
        return (
            <CardCompanyComponent key={company._id} company={company}/>
        );
    }

    componentDidMount(){
        this.props.getCompanies(this.props.location.search);
    }

    componentDidUpdate(prevProps){
       if(this.props.location.search!== prevProps.location.search){
            this.props.getCompanies(this.props.location.search);
       }
    }

    render(){
        const {classes,total, docs, pages, page} = this.props;
        if(this.props.isLoading){
            return <Loader />
        }
        return (
            <div className={classes.companies}>
                {total>0 
                    ? 
                    <>
                        <div className={classes.total}>
                            найдено {total}
                        </div>
                        <div className={classes.table}>
                            {docs.map(this.renderCompany)}
                        </div>
                        <div className={classes.pagination}>
                            <Pagination pages={pages} page={page}/>
                        </div>
                    </>
                    : <p>Ничего не найдено</p>
                } 
            </div>
        )
    }
}

CompaniesList.propTypes = {
    classes: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    getCompanies: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default withRouter(withStyles(styles)(CompaniesList));


