/* -----------------------------------------------
FILE: utils.js

DESCRIPTION:


(c) 2018 Joselito Pe 
-------------------------------------------------- */

export const isUserGuest = (provider)=>{
    if (provider === 'guest')
        return true;
    else
        return false;
}

export const xlateListOfValuesToValueLabel = (values, options) => {
    let valueLabelList = [];

    values.map (
        (value) => {
            options.some (
                (option) => {
//                       alert(`value:${value}, option:${option.value}`);
                    if (value === option.value) {
//                           alert('match2');
                        valueLabelList.push(option);
                        return true;
                    }

                }
            )
        }
    )
    return valueLabelList;
}
export const xlateValueToValueLabel =  (value,options) => {
    let valueLabel = {};
    console.log(value);
    console.log (options);
    options.some(
        (option)=>{
            if (option.value === value) {
                valueLabel = option;
                console.log(valueLabel);
//                   alert(`match label:${valueLabel}`)
                return true;
            }
        }
    )

    return valueLabel;
}    