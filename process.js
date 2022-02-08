let input_data = process.argv.slice(2);
let res = {};
let is_num = num => !isNaN(num);
if(input_data.length > 0){
    res = validateTypes(input_data);
    console.log("Pasamos la prueba")
}else{
    res.error = {
        descripcion: "Entrada vacía"
    }
}

function validateTypes (input_data){
    if(input_data.every(is_num)){
        let promedio = input_data.reduce((p,c) => Number(p) + Number(c));
        return {
            datos: {
                numeros: input_data,
                promedio: promedio/input_data.length,
                max: Math.max.apply(Math, input_data),
                min: Math.min.apply(Math, input_data),
                ejecutable: process.execPath,
                pid: process.pid
            }
        }
    }else{
        return {
            error:{
                descripcion:"Error de tipo",
                numeros: input_data,
                tipos: input_data.map(element =>{
                    if(is_num(element)) return "number";
                    return typeof(element)
                })
            }
        }
    }
}

console.log(res);