export const valid = value =>  value.length < 4 && value.length >= 0 ? false : true;

export const validPassword = value =>  (/^[a-zA-Z0-9]{6,30}$/).test(value) ? true: false;

export const validConfirmPassword = (value, password) =>   value !== password  ? false  : true;
      
export const validPhone = value => value!==null && value.length < 7  ? false: true;
      
export const validEmail = value => {
    if(value === null && value==='') return true;
    if(value !== null && (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value))
        return true;
    return false;
};

export const formValid = (errors) => {
    let valid = true;
  
    Object.values(errors).forEach(val=> val ===false && (valid = false));
    return valid;
  }