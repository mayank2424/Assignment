//Regex
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export const validate = (key, value) => {
    let errors = {};
    switch(key) {
        case 'accountId':
            errors.accountId = (!value || !value.length) ? 'Account Id is required' : null
            break;
        case 'email':
            errors.email = (!value || !value.length) ? 'Email address is required' : !validEmailRegex.test(value) ? 'Email is invalid' : null
            break;
        case 'password':
            errors.password = (!value || !value.length) ? 'Password is required' : value.length < 4 ? 'Password must be 4 characters long!' : null
            break;
        case 'name':
            errors.name = (!value || !value.length) ? 'Name is required' : null
            break;
        default: 
            break;
    }
    return errors;
}