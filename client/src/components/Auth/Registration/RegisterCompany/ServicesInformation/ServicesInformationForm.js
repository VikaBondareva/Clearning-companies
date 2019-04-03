import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
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
                &&  touched.services[index][value];
    }

    function renderInput(service, i){
        return (
            <div className={classes.grid} key={(i+1)*15}>
                <FormControl margin="normal" required>
                    <InputLabel 
                        htmlFor={`services[${i}].name`}
                    >Service name</InputLabel>
                    <Input 
                        name={`services[${i}].name`}
                        onChange={handleChange}
                        value={values.services[i].name}
                        onBlur={handleBlur}
                        error={isError(i,'name')}
                    />
                </FormControl>
                <FormControl margin="normal" >
                    <InputLabel 
                        htmlFor={`services[${i}].coefficient`}
                    >Toilet time</InputLabel>
                    <Input 
                        name={`services[${i}].coefficient`}
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
                        onClick={async ()=>{
                            await setFieldValue('actionName','remove');
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
