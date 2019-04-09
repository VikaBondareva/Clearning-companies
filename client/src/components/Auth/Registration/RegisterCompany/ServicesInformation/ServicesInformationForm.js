import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from '../../../style';

function ServicesFrom(props) {

    const { classes, values, errors, touched, handleChange,setFieldValue,handleBlur,handleSubmit } = props;

    function isError(index, value){
        return  Boolean(errors.services)  
                && Boolean(errors.services[index]) 
                && Boolean(errors.services[index][value])
                && touched.services 
                && touched.services[index] 
                && touched.services[index][value];
    }

    function renderSelectMenu(values){
        console.log(values);
        return values.map(value => (
            <MenuItem  key={value._id} value={value.name}>{value.name}</MenuItem>
        ))
    }

    function renderInput(service, i){
        const {values} = props;
        console.log(service.name);
        return (
            <div className={classes.grid} key={(i+1)*15}>
                 <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor={`services[${i}].name`}>Выберите тип услуги</InputLabel>      
                    <Select
                        name={`services[${i}].name`}
                        onChange={handleChange}
                        value={service.name}
                        // placeholder={service.name}
                        onBlur={handleBlur}
                        error={isError(i,'name')}
                        >
                            {renderSelectMenu(values.serviceTypes)}
                        </Select>
                </FormControl>
                <FormControl margin="normal" >
                    <InputLabel 
                        htmlFor={`services[${i}].coefficient`}
                    >coefficient</InputLabel>
                    <Input 
                        name={`services[${i}].coefficient`}
                        type='number'
                        onChange={handleChange}
                        value={values.services[i].coefficient}
                        onBlur={handleBlur}
                        error={isError(i,'coefficient')}
                    />
                </FormControl>
                <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={async ()=>{
                            await setFieldValue('actionName','remove');
                            await setFieldValue('removeIndex',i);
                            handleSubmit();
                        }}
                        className={classes.deleteItem}
                    >
                        X
                    </Button>
            </div>
        );
    }

    return (
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.grid}>
                    <p>Services</p>
                </div>
                {values.services.map(renderInput)}
                <div className={classes.grid}>
                    <Button
                        variant="outlined"
                        onClick={async ()=>{
                            await setFieldValue('actionName','add');
                            handleSubmit();
                        }}
                    >
                    Add more services
                    </Button>
                </div>
                <div className={classes.grid}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={async ()=>{
                            await setFieldValue('actionName','back');
                            handleSubmit();
                        }}
                        className={classes.submit}
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={async ()=>{
                            await setFieldValue('actionName','register');
                            handleSubmit();
                        }}
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
    );
}

ServicesFrom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ServicesFrom);
