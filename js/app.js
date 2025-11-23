let ingresos=[{
    Quincena: 9000,
    Venta: 400
}];

let egresos=[{
    Renta: 900,
    Ropa:400
}];

//Funcion total ingresos
const totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        for(let elemento in ingreso){
            totalIngreso += ingreso[elemento];
        }
    }
    return totalIngreso
}

//Funcion total egresos
const totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of egresos){
        for(let elemento in egreso){
            totalEgreso += egreso[elemento]
        }
    }
    return totalEgreso
}

const cargarCabecero = () => {
    let presupuesto = totalIngresos()-totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    console.log(presupuesto);
    console.log(porcentajeEgreso);
    console.log(totalIngresos());
    console.log(totalEgresos());
}

cargarCabecero();