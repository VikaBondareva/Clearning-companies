import {
    string,
    object,
    number,
} from 'yup';

const RoomsSchema = object().shape({
    toilet: object().shape({
        price : number().required().min(0),
        time: number().required().min(0)
    }),
    standart: object().shape({
        price : number().required().min(0),
        time: number().required().min(0)
    }),
    big: object().shape({
        price : number().required().min(0),
        time: number().required().min(0)
    }),
})

export default RoomsSchema;