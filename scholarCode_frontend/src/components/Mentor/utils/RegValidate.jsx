import * as Yup from 'yup';

const MAX_FILE_SIZE = 10240000; //100KB
const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

export const userSchema = Yup.object({

    first_name :Yup.string().required(),
    last_name :Yup.string().required(),
    email:Yup.string().email().required(),
    username:Yup.string().required(),
    designation:Yup.string().required(),
    linkedin_profile:Yup.string().required(),
    password:Yup.string().required().min(5),
    confirm_password: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
    
    
//     profile_img: Yup.mixed()
//   .required("Required")
// //   .test("is-valid-type", "Not a valid image type", value => isValidFileType(value && value.name.toLowerCase(), "image"))
//   .test("is-valid-size", "Max allowed size is 100KB", value => {
//     if (!value) return true; // Allow undefined or null values
//     return value.size <= 10240000; // 100KB in bytes
//   }),





})