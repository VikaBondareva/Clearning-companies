import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import {querySearch} from '../../../utils';
import {SelectChip,Select} from '../../common/select'
import styles from './style';
import {serviceTypes,selectCity,selectSort,selectCountCard, daysSelect} from '../../../utils'
import {parse} from 'query-string';

const selectDays = [
  ...daysSelect,
  {value: "", name: ""}
]

class SearchMenuComponent extends Component{
         
    constructor(){
      super();

      this.state = {
        city: "",
        perPage: 10,
        sort: "",
        maxPrice: "",
        minPrice: "",
        name:"",
        day:"",
        services: []
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
      const params = parse(this.props.location.search); 
      if( params.services instanceof Array){
        params.services= [...params.services];
      } else if(params.services){
        params.services= [params.services];
      }
      this.setState({
        ...this.state,
        ...params
      })
    }

    render () {
      const {classes} = this.props;
      const {city, perPage, sort, maxPrice, minPrice,name,services,day } = this.state;
      return (
          <div 
            className={classes.main}
            >
            <div className={classes.search}>
              {/* <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                    placeholder="Поиск по названию компании.."
                    name="name"
                    value={name}
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                /> */}
              </div>
              <div className={classes.fromFilter}>
                <Select 
                    value={sort} 
                    name="Сортировка"
                    targetValue="sort"
                    options={selectSort}
                    onChange={this.handleChange}
                />
                <Select 
                    targetValue="perPage"
                    value={perPage} 
                    name="Количество на странице"
                    onChange={this.handleChange}
                    options={selectCountCard}
                />
                {/* <Select 
                    value={city} 
                    targetValue="city"
                    name="Город"
                    onChange={this.handleChange}
                    options={selectCity}
                /> */}
                 {/* <Select 
                    value={day} 
                    targetValue="day"
                    name="День недели работы"
                    onChange={this.handleChange}
                    options={selectDays}
                /> */}
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="minPrice" >Минимальная цена</InputLabel>
                    <Input 
                        className={classes.select}
                        name="minPrice"
                        type="number"
                        onChange={this.handleChange}
                        value={minPrice}
                        inputProps={{
                            min: 0,
                        }}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="maxPrice" >Максимальная цена</InputLabel>
                    <Input 
                        className={classes.select}
                        name="maxPrice"
                        type="number"
                        onChange={this.handleChange}
                        value={maxPrice}
                        inputProps={{
                            min:10
                        }}
                    />
                </FormControl>
                {/* <SelectChip 
                  services={services}
                  onChange={this.handleChange}
                  servicesTypes={serviceTypes}
                  isSmall={true}
                  name="services"
                /> */}
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