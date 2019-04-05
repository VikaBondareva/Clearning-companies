import React, {Component} from 'react';
import {SearchMenu} from './SearchForm';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CompaniesList from './CompaniesList';

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

    componentWillUnmount(){
        this.props.clearFilters();
    }

    componentDidMount(){
        this.props.getCompanies();
    }

    render(){
        const {classes, docs, total} = this.props;
        return (
            <>
                <SearchMenu/>
                <section className={classes.main}>
                    <CompaniesList docs={docs} total={total}/>
                </section>
            </>
        );
    }
}

HomeComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    docs: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    clearFilters: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired
};

export default withStyles(styles)(HomeComponent);
