import React from 'react';
import ButtonUI from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './buttonsStyle'

function ButtonComponent({isDark, onClick, name,classes}){

    const classColor = !isDark ? classes.btnLinkLight : classes.btnLinkDark;
    return (
        <ButtonUI
            className={classColor}
            variant="contained"
            color='primary'
            type="submit"
            onClick={onClick}
            >
            {name}
        </ButtonUI>
    );
}

export const Button = withStyles(styles)(ButtonComponent)