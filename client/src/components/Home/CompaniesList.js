import React from 'react';
import CardCompanyComponent from '../CompanyCard/CardCompanyComponent';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Pagination} from '../../containers/pagination';
import Loader from '../common/loading/loader';
import { connect} from 'react-redux';

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
    }
})

function CompaniesList(props){

    function renderCompany(company){
        return (
            <CardCompanyComponent key={company._id} company={company}/>
        );
    }

    function render(){
        if(props.isLoading){
            return <Loader />
        }
        return (total ? (
            <>
                <div className={classes.companies}>
                    <div className={classes.total}>
                        найдено {total}
                    </div>
                    <div className={classes.table}>
                        {docs.map(renderCompany)}
                    </div>
                </div>
                <Pagination pages={pages} page={page}/>
            </>
        ) : <div className={classes.companies}>
                <p>Ничего не найдено</p>
            </div>
        )
    }

    const {classes,total, docs, pages, page} = props;
    return render();
}

CompaniesList.propTypes = {
    classes: PropTypes.object.isRequired,
    docs: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
    isLoading : state.isLoading
});


export default connect(
    mapStateToProps
)(withStyles(styles)(CompaniesList));


