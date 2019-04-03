import {
    object,
    number,
    string,
    array
} from 'yup';

const RoomsSchema = object().shape({
   services: array().of(object().shape({
       name: string().required(),
       coefficient: number().required()
   })).min(1).required()
})

export default RoomsSchema;