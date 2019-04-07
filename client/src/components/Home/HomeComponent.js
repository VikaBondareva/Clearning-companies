import React from 'react';
import {SearchMenu} from './SearchForm';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {CompaniesList} from '../../containers/pages'

const styles ={
    main: {
        width: "100%",
        background: "white",
        boxSizing: "border-box",
    }
}

function HomeComponent(props) {
    const {classes} = props;
    return (
        <>
            <SearchMenu/>
            <section className={classes.main}>
                <CompaniesList/>
            </section>
        </>
    );
}

HomeComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeComponent);
