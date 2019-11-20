import React from 'react';
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
                    <p className={classes.formTitle}>Расценки комнат</p>
                    <p className={classes.formTitle}>Санузел</p>
                    <div className={classes.grid}>
                        <FormControl margin="normal" required>
                            <InputLabel 
                                htmlFor="toilet.price"
                            >Цена</InputLabel>
                            <Input 
                                name="toilet.price"
                                type='number'
                                onChange={handleChange}
                                value={values.toilet.price}
                                onBlur={handleBlur}
                                error={isError("toilet", "price")}
                            />
                        </FormControl>
                        <FormControl margin="normal"  required>
                                <InputLabel 
                                htmlFor="toilet.time"
                                >Время уборки</InputLabel>
                                <Input 
                                name="toilet.time"
                                type='number'
                                onChange={handleChange}
                                value={values.toilet.time}
                                onBlur={handleBlur}
                                error={isError("toilet", "time")}
                                />
                        </FormControl>
                    </div>
                    <p className={classes.formTitle}>Маленькая комната</p>
                    <div className={classes.grid}>
                    <FormControl margin="normal" required fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="standart.price">Цена</InputLabel>
                        <Input 
                            name="standart.price"
                            type='number'
                            onChange={handleChange}
                            value={values.standart.price}
                            onBlur={handleBlur}
                            error={isError("standart", "price")}
                            />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth className={classes.formControl}>
                            <InputLabel htmlFor="standart.time">Время уборки</InputLabel>
                            <Input 
                            name="standart.time"
                            type='number'
                            onChange={handleChange}
                            value={values.standart.time}
                            onBlur={handleBlur}
                            error={isError("standart", "time")}
                            />
                    </FormControl>
                    </div>
                    <p className={classes.formTitle}>Большая комната</p>
                    <div className={classes.grid}>
                        <FormControl margin="normal" required >
                            <InputLabel htmlFor="big.price">Цена</InputLabel>
                            <Input 
                                name="big.price"
                                type='number'
                                onChange={handleChange}
                                value={values.big.price}
                                onBlur={handleBlur}
                                error={isError("big", "price")}
                            />
                        </FormControl>
                        <FormControl margin="normal" required >
                            <InputLabel htmlFor="big.time">Время</InputLabel>
                            <Input 
                            name="big.time"
                            type='number'
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
                            Назад
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
                            Дальше
                        </Button>
                    </div>
                  </form>
        );
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Registration);
