import React from 'react';
import CardCompanyComponent from '../CompanyCard/CardCompanyComponent';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Pagination} from '../../containers/pagination'
import loadingHOC from '../common/loading/loadingHOC';

const styles ={
    companies: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        padding: "0 50px"
    }
}

function CompaniesList(props){

    function renderCompany(company){
        return (
            <CardCompanyComponent key={company._id} company={company}/>
        );
    }
    const {classes,total, docs} = props;
    return (
        <>
            <div className={classes.companies}>
                <div className={classes.total}>
                    Найдено: {total}
                </div>
                <div style={{margin: "20px 0"}}>
                    {docs.map(renderCompany)}
                </div>
            </div>
            <Pagination />
        </>
    );
}

CompaniesList.propTypes = {
    classes: PropTypes.object.isRequired,
    docs: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
};

export default loadingHOC('docs')(withStyles(styles)(CompaniesList));
