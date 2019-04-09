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
import {querySearch} from '../../../helpers';
import Select from './SetectComponent';
import {SelectChip} from '../../common/select'
import styles from './style';
import {serviceTypes} from '../../../helpers'
import {parse} from 'query-string';

const selectSort =[
    {value: "", name: ""},
    {value: "asc", name: "По возрастанию цены"},
    {value: "desc", name: "По убиванию цены"},
    {value: "ratting", name: "По популярности"}
];

const selectCountCard =[
    {value: 10, name: 10},
    {value: 20, name: 20},
    {value: 25, name: 25},
    {value: 30, name: 30},
    {value: 40, name: 40},
];

const selectCity =[
    {value: "", name: "Все города"},
    {value: "Могилев", name: "Могилев"},
    {value: "Витебск", name: "Витебск"},
    {value: "Гродно", name: "Гродно"},
    {value: "Минкc", name: "Минкc"},
    {value: "Гомель", name: "Гомель"},
    {value: "Брест", name: "Брест"},
];

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
      const {city, perPage, sort, maxPrice, minPrice,name,services } = this.state;
      return (
          <div 
            className={classes.main}
            >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
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
                />
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
                <Select 
                    value={city} 
                    targetValue="city"
                    name="Город"
                    onChange={this.handleChange}
                    options={selectCity}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel shrink htmlFor="minPrice" >Минимальная цена</InputLabel>
                    <Input 
                        className={classes.select}
                        name="minPrice"
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
                        onChange={this.handleChange}
                        value={maxPrice}
                        inputProps={{
                            min:1
                        }}
                    />
                </FormControl>
                <SelectChip 
                  services={services}
                  onChange={this.handleChange}
                  servicesTypes={serviceTypes}
                  name="services"
                />
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