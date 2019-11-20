import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SelectUI from '@material-ui/core/Select';
import styles from '../../Home/SearchForm/style';
import { withStyles } from '@material-ui/styles';

function SelectComponent(props){

    function renderSelect(props){
        return(
            <FormControl className={props.classes.formControl}>
                <InputLabel shrink htmlFor={props.targetValue} >{props.name}</InputLabel>
                <SelectUI
                native
                name={props.targetValue}
                value={props.value}
                className={props.classes.select}
                onChange={props.onChange}
                inputProps={{
                    name: props.targetValue,
                    id: props.targetValue,
                }}
                >
                    {renderOptions(props.options)}
                </SelectUI>
            </FormControl>
        )
    }
  
    function renderOptions(options){
        return options.map((option,i)=>(
          <option  key={i} value={option.value}>{option.name}</option>
        ))
    }

    return renderSelect(props)
}

export const Select = withStyles(styles)(SelectComponent)