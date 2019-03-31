import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
layoutLeft: {
    height: 350,
    border: "1px solid",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 10,
    marginRight: 20
  },
  text:{
      borderBottom: "1px solid",
      fontStyle: "italic",
  },
  formControl: {
    margin: "15px 8px",
    minWidth: 180,
  },
  select:{
    paddingTop: theme.spacing.unit,
  }
});

function LayoutLeft ({classes}){

    const [state, setState] = React.useState({
        price: '',
        perPage: 10,
        city: "",
        name: 'hai',
        maxPrice:"",
        minPrice:"",

      });

      const handleChange = name => event => {
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

        return (
              <div>
                     <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="price-sort" >Сортировка по цене</InputLabel>
                        <Select
                        native
                        value={state.price}
                        className={classes.select}
                        onChange={handleChange('price')}
                        inputProps={{
                            name: 'price',
                            id: 'price-sort',
                        }}
                        >
                        <option value='none'>None</option>
                        <option value='asc'>Ascending</option>
                        <option value='desc'>Descending</option>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor="perPage" >Количестов на странице</InputLabel>
                        <Select
                        native
                        value={state.perPage}
                        className={classes.select}
                        onChange={handleChange('perPage')}
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
                        value={state.city}
                        className={classes.select}
                        onChange={handleChange('city')}
                        inputProps={{
                            name: 'city',
                            id: 'city',
                        }}
                        >
                        <option value=""></option>
                        <option value="Могилев">Могилев</option>
                        <option value="Витебск">Витебск</option>
                        <option value="Гродно">Гродно</option>
                        <option value="Минск">Минск</option>
                        <option value="Брест">Брест</option>
                        <option value="Гомель">Гомель</option>
                        </Select>
                    </FormControl>

                    <Button size="small" variant="contained" color="primary">
                        Найти
                    </Button>
              </div>
        );
}

LayoutLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LayoutLeft);