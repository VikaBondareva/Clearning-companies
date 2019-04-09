import{ string, object, number } from 'yup';

const ReviewSchema = object().shape({
    ratting: number()
        .required("Ratting is required")
        .min(1)
        .max(5),
    reviewText: string()
        .required("Text review is required")
        .min(6)
        .max(999)
})

export default ReviewSchema;