import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    grow: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      background: "#e5e7ea",
      borderRadius: theme.shape.borderRadius,
      marginRight: theme.spacing.unit * 2,
      margin: "20px 30px",
      width: '80%',
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

        constructor(props){
          super(props);
          
          this.handleChange = this.handleChange.bind(this);
          this.handleKeyPress = this.handleKeyPress.bind(this);
        }

        handleKeyPress(event){
          if(event.key == 'Enter'){
            this.props.searchCompanies();
          }
        }

        handleChange(event){
          const {name, value } = event.target;
          if(value){
            this.props.saveFilter(name, value);
          } else {
            this.props.clearFilter(name);
          }
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
                        onChange={this.handleChange}
                        name="name"
                        value={this.props.name}
                        onKeyPress={this.handleKeyPress}
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
    classes: PropTypes.object.isRequired,
    searchCompanies: PropTypes.func.isRequired,
    saveFilter: PropTypes.func.isRequired,
    clearFilter:PropTypes.func.isRequired
}

export default withStyles(styles)(SearchFormComponent);