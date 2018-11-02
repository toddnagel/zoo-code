export const dynamicValidator = (value, validationObj) => {
    //required validation
    if ( !value && validationObj.required === true ) {
            return validationObj.msg.required;
    }

    //numeric validation
    if ( value && validationObj.numeric === true && /[^0-9 .,]/i.test(value) ) {
        return validationObj.msg.numeric;
    }
    //minLength validation
    if ( value && validationObj.minLength === true && (value.length < 2 || value.length > 30) ) {
        return `${validationObj.label} ${validationObj.msg.numeric}`;        
    }
    //alphaDotDash validation
    if (value && validationObj.alpha === true && /[^a-zA-Z'.\- ]/i.test(value)) {
        return `${validationObj.label} ${validationObj.msg.alphaDotDash}`;        
    }    
}