import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
    grow: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      background: "#e5e7ea",
      borderRadius: theme.shape.borderRadius,
      // '&:hover': {
      //   backgroundColor: fade(theme.palette.common.white, 0.25),
      // },
      marginRight: theme.spacing.unit * 2,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: '400px',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  });
  
 class SearchFormComponent extends Component{


        state = {
            name:"",
            nameService:""
        }

        render(){
         const {classes} = this.props;

            return (
                <>
                    <div 
                    className={classes.search}
                    >
                        <div 
                        className={classes.searchIcon}
                        >
                        <SearchIcon />
                        </div>
                        <InputBase
                        placeholder="Поиск по услуге или комапнии..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        />
                    </div>
                </>
            );
        }
}

SearchFormComponent.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchFormComponent);