import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  fromFilter: {
    paddingLeft: 20,
  },
  text:{
      borderBottom: "1px solid",
      fontStyle: "italic",
  },
  formControl: {
    margin: "15px 8px",
    minWidth: 200,
    [theme.breakpoints.down('sm')]: {
      minWidth: 150,
    },
  },
  select:{
    paddingTop: theme.spacing.unit,
  }
});

class LayoutLeft extends Component{

    constructor(props){
      super(props);

      // this.state = {
      //   city : props.city,
      //   sort : props.sort,
      //   maxPrice: props.maxPrice,
      //   minPrice : props.minPrice,
      //   perPage: props.perPage
      // }

      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {
      this.props.searchCompanies();
    }

    handleChange = type => event => {
      const {name, value } = event.target;
      if(value){
        let val = value;
        if(type==="number")
          val = +val;
        this.props.saveFilter(name, val);
      } else {
        this.props.clearFilter(name);
      }
    };

    render() {
      const {classes,city, perPage, sort, maxPrice, minPrice} = this.props;
      // const {} = this.state;
      return (
        <>
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
              <Button size="small" variant="contained" color="primary" onClick={this.handleClick}>
                  Найти
              </Button>
        </div>
        <div className={classes.fromFilter}>
               <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="minPrice" >Минимальная цена</InputLabel>
                  <Input 
                        name="minPrice"
                        onChange={this.handleChange('number')}
                        value={minPrice}
                  />
              </FormControl>
              <FormControl className={classes.formControl}>
                  <InputLabel shrink htmlFor="maxPrice" >Максимальная цена</InputLabel>
                  <Input 
                        name="maxPrice"
                        onChange={this.handleChange('number')}
                        value={maxPrice}
                  />
              </FormControl>
        </div>
        </>
    );
  }
}

LayoutLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  saveFilter: PropTypes.func.isRequired,
  searchCompanies: PropTypes.func.isRequired,
  clearFilter:PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  maxPrice: PropTypes.number,
  minPrice: PropTypes.number,
  sort: PropTypes.string.isRequired
};

export default withStyles(styles)(LayoutLeft);