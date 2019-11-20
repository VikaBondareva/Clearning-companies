import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Star from '@material-ui/icons/Star';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import './style.css';

const style = {
    radioGroup: {
        flexDirection: "row"
    },
    starChecked: {
        color : "#ffcb03"
    }
  };

function ReviewForm(props) {
   
    const {  classes, errors, touched,values,setFieldValue, handleChange,handleBlur,handleSubmit } = props;
    return (
        <div className="container-review">
            <p >
            Мы стремимся предоставить лучший сервис для наших клиентов. Пожалуйста, оставьте отзыв
            чтобы сообщить нам, как у нас дела, и поделиться своим опытом с другими.
            </p>
            <form className="form-review" onSubmit={handleSubmit}>
                <h2 className="title-review">Write Your Review</h2>
                <RadioGroup 
                    name="ratting"
                    onBlur={handleBlur}
                    value={values.ratting}
                    className={classes.radioGroup}
                    error={Boolean(errors.ratting)}
                    required
                >
                    <Radio 
                        value={1} 
                        checked={values.ratting === 1}
                        onChange={() => {
                            setFieldValue('ratting', 1)
                        }}
                        checkedIcon={<Star className={classes.starChecked} />} 
                        icon={<Star />} 
                    />
                    <Radio 
                        value={2} 
                        checked={values.ratting === 2}
                        onChange={() => {
                            setFieldValue('ratting', 2)
                        }}
                            checkedIcon={<Star className={classes.starChecked} />} 
                        icon={<Star />} 
                        />
                         <Radio 
                             value={3} 
                             checked={values.ratting === 3}
                             onChange={() => {
                                setFieldValue('ratting', 3)
                             }}
                             checkedIcon={<Star className={classes.starChecked} />} 
                             icon={<Star />} 
                        />
                         <Radio 
                             value={4} 
                             checked={values.ratting === 4}
                             onChange={() => {
                                setFieldValue('ratting', 4)
                             }}
                             checkedIcon={<Star className={classes.starChecked} />} 
                             icon={<Star />} 
                        />
                         <Radio 
                             value={5} 
                             checked={values.ratting === 5}
                             onChange={() => {
                                setFieldValue('ratting', 5)
                             }}
                             checkedIcon={<Star className={classes.starChecked} />} 
                             icon={<Star />} 
                        />
                </RadioGroup> 
                <span className="help-block">
                    Нажмите на звездочку, чтобы изменить свой рейтинг 1 - 5, где 5 = отлично! и 1 = очень плохо
                </span>
                {errors.ratting && touched.ratting && <div className="error">{errors.ratting}</div>}
                <FormControl margin="normal" required fullWidth>
                    <label className="control-label" htmlFor="reviewText">Ваш отзыв:</label>
                    <textarea 
                        className="control-textarea" 
                        rows="10" 
                        placeholder="Your Reivew" 
                        name="reviewText"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="review"
                    >
                    </textarea>
                </FormControl>
                {errors.reviewText && touched.reviewText && <div className="error">{errors.reviewText}</div>}
                {values.isAuth
                    ? <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="form-btn"
                    >
                        Оставить отзыв
                    </Button>
                    : <Link to='/login'>
                        <Button size="small" variant="contained" color="primary">
                            Войти
                        </Button>
                    </Link>
                }
            </form>
        </div>
    );
}

export default withStyles(style)(ReviewForm);