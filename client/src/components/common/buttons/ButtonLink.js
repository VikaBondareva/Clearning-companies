import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './buttons'

function ButtonLinkComponent({to, classes, onClick, name, color}){

    return (
        <Link to={to} className={classes.linkMenu}>
            <Button
                variant="contained"
                className={classes.btnLink}
                >
                {name}
            </Button>
        </Link>
    );
}

export const ButtonLink = withStyles(styles)(ButtonLinkComponent)