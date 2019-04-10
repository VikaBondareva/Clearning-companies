import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const styles = theme => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    formBooking: {
          margin: "10px 30px"
    },
    inputLabel:{
          marginRight: 5,
          marginLeft: 5,
          marginTop: 0,
          minWidth: 150,
          [theme.breakpoints.up("md")]: {
            minWidth: 200,
          },
    },
})

function SelectChipComponent(props){

    function renderMenuItemsCheckbox(values, valesBooking){
        return values.map(value => (
            <MenuItem key={value._id} value={value.name}>
                <Checkbox checked={valesBooking.indexOf(value.name) > -1} />
                <ListItemText primary={value.name} />
            </MenuItem>
        ))
    }

    const {classes} = props;

    return (
        <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor={props.name}>Выберите услуги</InputLabel>
            <Select
                multiple
                name={props.name}
                value={props.services}
                onChange={props.onChange}
                renderValue={selected => (
                    <div className={classes.chips}>
                    {selected.map(value => (
                        <Chip key={value} label={value} className={classes.chip} />
                    ))}
                    </div>
                )}
                MenuProps={MenuProps}
            >
                {renderMenuItemsCheckbox(props.servicesTypes, props.services)}
            </Select>
        </FormControl>
    );
}

export const  SelectChip = withStyles(styles)(SelectChipComponent);
