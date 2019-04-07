import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {querySearch} from '../../../helpers';
import styles from './style';
import {parse} from 'query-string';

class SearchMenuComponent extends Component{
         
    constructor(){
      super();

      this.state = {
        city: "",
        perPage: 10,
        sort: "",
        maxPrice: "",
        minPrice: "",
        name:""
      }

      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
      this.search = this.search.bind(this);
    }

    handleClick() {
      this.search();
    }

    search(){
      const pathname = this.props.location.pathname;
      const queries = querySearch(this.props.history.location.search,this.state);
      this.props.history.push(`${pathname}${queries}`)
    }

    handleKeyPress(event){
      if(event.key == 'Enter'){
       this.search();
      }
    }

    handleChange(event){
      const {name, value } = event.target;
      this.setState({[name]: value});
    };

    componentDidMount(){
      const {...params} = parse(this.props.location.search); 
      this.setState({
        ...this.state,
        ...params
      })
    }
    
    render () {
      const {classes} = this.props;
      const {city, perPage, sort, maxPrice, minPrice,name} = this.state;
      return (
          <div 
            className={classes.main}
            >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                    placeholder="Поиск по услуге или комапнии..."
                    name="name"
                    value={name}
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                />
              </div>
              <div className={classes.fromFilter}>
                  <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="sort" >Сортировка</InputLabel>
                      <Select
                      native
                      value={sort}
                      className={classes.select}
                      onChange={this.handleChange}
                      inputProps={{
                          name: 'sort',
                          id: 'sort',
                      }}
                      >
                      <option value=''></option>
                      <option value='asc'>Ascending price</option>
                      <option value='desc'>Descending price</option>
                      <option value='ratting'>Population</option>
                      </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="perPage" >Количестов на странице</InputLabel>
                      <Select
                      native
                      value={perPage}
                      className={classes.select}
                      onChange={this.handleChange}
                      inputProps={{
                          name: 'perPage',
                          id: 'perPage',
                      }}
                      >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={25}>25</option>
                      <option value={30}>30</option>
                      <option value={50}>50</option>
                      </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="city" >Город</InputLabel>
                      <Select
                      native
                      value={city}
                      className={classes.select}
                      onChange={this.handleChange}
                      inputProps={{
                          name: 'city',
                          id: 'city',
                      }}
                      >
                      <option value="">All</option>
                      <option value="Mogivel">Mogivel</option>
                      <option value="Витебск">Витебск</option>
                      <option value="Гродно">Гродно</option>
                      <option value="Минкc">Минкc</option>
                      <option value="Брест">Брест</option>
                      <option value="Гомель">Гомель</option>
                      </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="minPrice" >Минимальная цена</InputLabel>
                      <Input 
                            className={classes.select}
                            name="minPrice"
                            onChange={this.handleChange}
                            value={minPrice}
                      />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                      <InputLabel shrink htmlFor="maxPrice" >Максимальная цена</InputLabel>
                      <Input 
                            className={classes.select}
                            name="maxPrice"
                            onChange={this.handleChange}
                            value={maxPrice}
                      />
                  </FormControl>
                  <Button size="small" variant="contained" color="primary" onClick={this.handleClick}>
                      Найти
                  </Button>
            </div>
          </div>
    );
  }
}

SearchMenuComponent.propTypes = {
    classes: PropTypes.object.isRequired
}

export const SearchMenu = withRouter(withStyles(styles)(SearchMenuComponent));