import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import classnames from 'classnames';
import styles from './buttonsStyle'

function ButtonLinkComponent({to, classes, name, dark, margin}){

    const colorClass = dark ?  classes.btnLinkDark : classes.btnLinkWhite;
    const marginClass =  margin === 'left' ? classes.btnMarginLeft : "";

    return (
        <Link to={to} className={classes.linkMenu}>
            <Button
                variant="contained"
                className={classnames(colorClass,marginClass, classes.btnMarginTop)}
                >
                {name}
            </Button>
        </Link>
    );
}

export const ButtonLink = withStyles(styles)(ButtonLinkComponent)