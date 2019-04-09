import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../style/styleForm';
import './style.css'

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

function BookingForm(props) {
        const { errors,values,classes,setFieldValue, touched, handleChange,handleBlur,handleSubmit } = props;

        function renderMenuItemsCheckbox(values, valesBooking){
            return values.map(service => (
                <MenuItem key={service._id} value={service}>
                    <Checkbox checked={valesBooking.indexOf(service) > -1} />
                    <ListItemText primary={service.name} />
                </MenuItem>
            ))
        }

        function renderSelectMenu(values){
            return values.map(value => (
                <MenuItem  key={value._id} value={value}>{value.name}</MenuItem>
            ))
        }

        function isError(value){
            return touched.countRooms && touched.countRooms[value] 
                && Boolean(errors.countRooms) && Boolean(errors.countRooms[value]);
        }

        const renderButtons =isCompany=>{
            if(isCompany){
                return (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={async ()=>{
                            console.log("action create")
                                await setFieldValue("action","create");
                                console.log(values)
                                handleSubmit();
                            }}
                        >
                            Заказать уборку
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={async ()=>{
                                console.log("action pricing")
                                await setFieldValue("action","pricing");
                                console.log(values.action)
                                handleSubmit();
                            }}
                        >
                            Предваритульные цена и время уборки
                        </Button>
                    </>
                )
            } 
            return (
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={async ()=>{
                        console.log("action chooseCompany")
                        await setFieldValue("action","chooseCompany");
                        console.log(values)
                        handleSubmit();
                    }}
                >
                    Рассмотреть предложения
                </Button>
            )
        }

        const renderRecurrentSelect= recurrent =>{
            if(recurrent){
                return (
                    <div>
                        <p>  Продолжительность сделки в месяцах (максимум  пол года: 6 месяцев)</p>
                        <FormControl  margin="normal" required className={classes.inputLabel} >
                            <Input 
                            type="number"
                            name="duration"
                            value={values.duration}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            inputProps={{
                                min: "1",
                                max: "6"
                            }}
                            error={touched.duration && Boolean(errors.duration)}
                            />
                        </FormControl>
                    </div>
                );
            }
            return null;
        }

        return (
            <form className={classes.formBooking} onSubmit={handleSubmit}>
                <p className="header-form">Форма бронирования уборки</p>
                <div className={classes.grid}>
                    <FormControl  required fullWidth>
                        <InputLabel 
                        htmlFor="address"
                        >Адрес</InputLabel>
                        <Input 
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address && Boolean(errors.address)}
                        />
                    </FormControl>
                </div>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="select-services">Выберите услуги</InputLabel>
                    <Select
                        multiple
                        value={values.services}
                        onChange={(event)=>{
                            console.log(event.target.value)
                            setFieldValue('services', event.target.value);
                        }}
                        input={<Input id="select-services" />}
                        renderValue={selected => (
                            <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value._id} label={value.name} className={classes.chip} />
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {renderMenuItemsCheckbox(values.servicesCompany, values.services)}
                    </Select>
                </FormControl>
                <div>
                    <p>Количество комнат</p>
                    <FormControl  margin="normal" required className={classes.inputLabel} >
                        <InputLabel 
                        htmlFor="countRooms.toilet"
                        >Санулов</InputLabel>
                        <Input 
                        type="number"
                        name="countRooms.toilet"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{
                            min: 0,
                            max: 20,
                        }}
                        error={isError('toilet')}
                        />
                    </FormControl>
                    <FormControl margin="normal" required className={classes.inputLabel} >
                        <InputLabel 
                        htmlFor="countRooms.standart"
                        >Маленькиих</InputLabel>
                        <Input 
                        type="number"
                        name="countRooms.standart"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{
                            min: 0,
                            max: 15
                        }}
                        error={isError('standart')}
                        />
                    </FormControl>
                    <FormControl margin="normal" required  className={classes.inputLabel}>
                        <InputLabel 
                        htmlFor="countRooms.big"
                        >Больших</InputLabel>
                        <Input 
                        type="number"
                        name="countRooms.big"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        inputProps={{
                            min: 0,
                            max: 15
                        }}
                        error={isError('big')}
                        />
                    </FormControl>
                </div>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="select-days">День, дни уборки</InputLabel>
                    <Select
                        multiple
                        value={values.days}
                        onChange={(event)=>{
                            console.log(event.target.value)
                            setFieldValue('days', event.target.value);
                        }}
                        input={<Input id="select-days" />}
                        renderValue={selected => (
                            <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value._id} label={value.name} className={classes.chip} />
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {renderMenuItemsCheckbox(values.daysSelect, values.days)}
                    </Select>
                </FormControl>
                <div className={classes.grid}>
                    <FormControl margin="normal"  required fullWidth className={classes.inputLabel}>
                        <TextField
                            type="date"
                            name="date"
                            label="Дата уборки"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.date && Boolean(errors.date)}
                            value={values.date}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth className={classes.inputLabel}>
                        <TextField
                            id="startTime"
                            label="Время начадо уборки"
                            type="time"
                            name="startTime"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.startTime}
                            error={touched.startTime && Boolean(errors.startTime)}
                        />
                    </FormControl>
                </div>
             
               
                <div className={classes.grid}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="regularity">Планируемая регулярность уборки</InputLabel>      
                        <Select
                            value={values.regularity}
                            onChange={async (e)=>{
                                if(values.regularity && e.target.value._id !==1){
                                    await setFieldValue("recurrent", true);
                                } else {
                                    await setFieldValue("recurrent", false);
                                }
                                handleChange(e);
                                
                            }}
                            onBlur={handleBlur}
                            error={touched.regularity && Boolean(errors.regularity)}
                            inputProps={{
                                name: 'regularity',
                                id: 'regularity',
                            }}
                        >
                            {renderSelectMenu(values.regularityTypes)}
                        </Select>
                    </FormControl>
                </div>
                {renderRecurrentSelect(values.recurrent)}
                <div>
                    {values.price>0 && <p>Предварительная цена уборки: {values.price} руб</p>}
                    {values.time>0 && <p>Предварительное время уборки: {values.time} минут</p>}
                </div>
                <div>
                    {renderButtons(values.previously)}
                </div>
            </form>
        );
}

BookingForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookingForm);
