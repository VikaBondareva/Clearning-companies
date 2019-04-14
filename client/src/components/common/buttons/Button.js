import React from 'react';
import ButtonUI from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './buttonsStyle'

function ButtonComponent(props){

    return (
        <ButtonUI
            // className={}
            variant="contained"
            color='primary'
            type="submit"
            onClick={props.onClick}
            >
            {props.name}
        </ButtonUI>
    );
}

export const Button = withStyles(styles)(ButtonComponent)