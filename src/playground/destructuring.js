console.log ('hey there');


const obj = {
    param1:"lito",
    param2:"pe"
};

function f1( {param2} ) // <-- destructuring param2 property from obj.
{ 
    console.log(param2);

    const obj2 = { ...obj};

    console.log (obj2);
}

f1(obj);