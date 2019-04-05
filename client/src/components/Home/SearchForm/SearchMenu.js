import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {SearchForm, FilterMenu} from '../../../containers/search';

const styles = theme => ({
    main: {
      display: "block",
      width: "100%",
      alignItems: "center",
      background: "white",
      border: "1px solid",
      marginBottom: "10px",
      [theme.breakpoints.down("sm")]: {
        display: "block"
      },
    },
  });
  
 function SearchMenuComponent(props){
         
    const {classes} = props;
        return (
            <>
                <div 
                className={classes.main}
                >
                    <SearchForm/>
                    <FilterMenu/>
                 </div>
            </>
        );
}

SearchMenuComponent.propTypes = {
    classes: PropTypes.object.isRequired
}

export const SearchMenu = withStyles(styles)(SearchMenuComponent);