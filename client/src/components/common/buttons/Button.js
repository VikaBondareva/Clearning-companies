import React from 'react';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './buttons'

function ButtonComponent(props){

    return (
        <Button
            className={}
            variant="contained"
            color={props.color}
            type="submit"
            onClick={props.onClick}
            >
            props.name
        </Button>
    );
}

export default withStyles(styles)(ButtonComponent)