import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import SearchForm from './SearchFormComponent';
import FilterMenu from './FiltterMenu';
const styles = theme => ({
    main: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      background: "white",
      border: "1px solid",
      marginBottom: "10px",
    },
  });
  
 class SearchMenu extends Component{
         
        render(){
         const {classes} = this.props;

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
}

SearchMenu.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchMenu);