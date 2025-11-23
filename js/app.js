const ingresos={
    Quincena: 9000,
    Venta: 400
}

const egresos={
    Renta: 900,
    Ropa:400
}

//Funcion total ingresos
const totalIngresos = () => {
    let totalIngreso = 0;
    for (const ingreso of ingresos){
        totalIngreso =+ ingreso
    }
    return totalIngreso
}

//Funcion total egresos
const totalEgresos = () => {
    let totalEgreso = 0;
    for(const egreso of egresos){
        totalEgreso =+ egreso;
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

cargarCabecero()