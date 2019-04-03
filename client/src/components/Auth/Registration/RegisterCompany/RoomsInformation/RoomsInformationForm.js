import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from '../../../style';

function Registration(props) {

        function isError(roomName, value){
            const room = touched[roomName]
            const roomError = errors[roomName]
            return room && room[value] && Boolean(roomError) && Boolean(roomError[value]);
        }

        const { classes, values, errors, touched, handleChange,handleBlur,setFieldValue,handleSubmit } = props;
        return (
                <form className={classes.form}>
                    <p className={classes.formTitle}>Rooms</p>
                    <p className={classes.formTitle}>Toilet</p>
                    <div className={classes.grid}>
                        <FormControl margin="normal" required>
                            <InputLabel 
                                htmlFor="toilet.price"
                            >Toilet price</InputLabel>
                            <Input 
                                name="toilet.price"
                                onChange={handleChange}
                                value={values.toilet.price}
                                onBlur={handleBlur}
                                error={isError("toilet", "price")}
                            />
                        </FormControl>
                        <FormControl margin="normal"  required>
                                <InputLabel 
                                htmlFor="toilet.time"
                                >Toilet time</InputLabel>
                                <Input 
                                name="toilet.time"
                                onChange={handleChange}
                                value={values.toilet.time}
                                onBlur={handleBlur}
                                error={isError("toilet", "time")}
                                />
                        </FormControl>
                    </div>
                    <p className={classes.formTitle}>Standart room</p>
                    <div className={classes.grid}>
                    <FormControl margin="normal" required fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="standart.price">Standart price</InputLabel>
                        <Input 
                            name="standart.price"
                            onChange={handleChange}
                            value={values.standart.price}
                            onBlur={handleBlur}
                            error={isError("standart", "price")}
                            />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="standart.time">Standart time</InputLabel>
                            <Input 
                            name="standart.time"
                            onChange={handleChange}
                            value={values.standart.time}
                            onBlur={handleBlur}
                            error={isError("standart", "time")}
                            />
                    </FormControl>
                    </div>
                    <p className={classes.formTitle}>Big room</p>
                    <div className={classes.grid}>
                        <FormControl margin="normal" required >
                            <InputLabel htmlFor="big.price">Big price</InputLabel>
                            <Input 
                                name="big.price"
                                onChange={handleChange}
                                value={values.big.price}
                                onBlur={handleBlur}
                                error={isError("big", "price")}
                            />
                        </FormControl>
                        <FormControl margin="normal" required >
                            <InputLabel htmlFor="big.time">Big time</InputLabel>
                            <Input 
                            name="big.time"
                            onChange={handleChange}
                            value={values.big.time}
                            onBlur={handleBlur}
                            error={isError("big", "time")}
                            />
                        </FormControl>
                    </div>
                    <div className={classes.grid}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={async ()=>{
                                await setFieldValue('isNext',false)
                                handleSubmit();
                            }}
                            className={classes.submit}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={async ()=>{
                                await setFieldValue('isNext',true);
                                handleSubmit();
                            }}
                            className={classes.submit}
                        >
                            Next
                        </Button>
                    </div>
                  </form>
        );
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Registration);
