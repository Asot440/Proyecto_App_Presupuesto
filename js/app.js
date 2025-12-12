//-------Definicion de las clases Dato, Ingreso y Egreso---------
class Dato{
    constructor(descripcion, valor){
        this._descripcion=descripcion;
        this._valor=valor;
    }
    get descripcion(){
        return this._descripcion;
    }
    set descripcion(descripcion){
        this._descripcion=descripcion;
    }
    get valor(){
        return this._valor;
    }
    set valor(valor){
        this._valor=valor;
    }
}

class Ingreso extends Dato{
    static contadorIngresos=0;
    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id=++Ingreso.contadorIngresos;
    }
    get id(){
        return this._id;
    }
}

class Egreso extends Dato{
    static contadorEgresos=0;
    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id=++Egreso.contadorEgresos
    }
    get id(){
        return this._id;
    }
}

//-------Arreglos de ingresos y egresos---------
const ingresos= [new Ingreso("Salario", 25000), new Ingreso("Venta auto", 150000)];

const egresos=[new Egreso("Renta", 2000), new Egreso("Ropa", 500), new Egreso("Comida para Gatos", 500) ];

//-------Funcion total ingresos---------

const totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos){
            totalIngreso += ingreso.valor;
        }
    return totalIngreso;
}

//-------Funcion total egresos---------

const totalEgresos = () => {
    let totalEgreso=0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

const cargarCabecero = () => {
    let presupuesto = totalIngresos()-totalEgresos();
    document.getElementById("presupuesto").innerHTML=formatoMoneda(presupuesto)+"MXN";
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById("porcentaje").innerHTML=formatoPorcentaje(porcentajeEgreso);
    document.getElementById("ingresos").innerHTML=formatoMoneda(totalIngresos())+" MXN";
    document.getElementById("egresos").innerHTML=formatoMoneda(totalEgresos())+" MXN";
    descripcion.value=""; //Limpia los campos despues de agregar un dato
    valor.value=""; //Limpia los campos despues de agregar un dato
}

//-------------Formatos moneda y porcentaje-------------
const formatoMoneda = (valor) => {
    return valor.toLocaleString("es-MX", {style: "currency", currency: "MXN", minimumFractionDigits: 2});
}
const formatoPorcentaje = (valor) => {
    return valor.toLocaleString("es-MX", {style: "percent", minimumFractionDigits: 2});
}

//-------------Carga de la aplicacion-------------
const cargarApp =() => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

//-------------Funciones para cargar ingresos-------------
const cargarIngresos = () => {
    let ingresosHTML= "";
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById("lista-ingresos").innerHTML=ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML=`
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">
            ${ingreso.descripcion}
        </div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">
                ${formatoMoneda(ingreso.valor)}
            </div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn"> <ion-icon name="close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon></button>
            </div>
        </div>
    </div>`
    return ingresoHTML;
}

//-------------Funcion para eliminar ingresos-------------
const eliminarIngreso = (id) => {
    let indiceEliminar=ingresos.findIndex(ingreso => ingreso.id===id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

//-------------Funciones para cargar egresos-------------
const cargarEgresos = () =>{
    let egresosHTML="";
    for(let egreso of egresos){
        egresosHTML+=crearEgresoHTML(egreso);
    }
    document.getElementById("lista-egresos").innerHTML=egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML =`
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">
            ${egreso.descripcion}
        </div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">
                ${formatoMoneda(egreso.valor)}
            </div>
            <div class="elemento_porcentaje">
                ${formatoPorcentaje(egreso.valor/totalEgresos())}
            </div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn"><ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon></button>
            </div>
        </div>
    </div>`
    return egresoHTML;
}

//-------------Funcion para eliminar egresos-------------
const eliminarEgreso = (id) => {
    let indiceEliminar=egresos.findIndex(egreso => egreso.id===id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

//-------------Funcion para agregar datos-------------
const agregarDato = () => {
    let forma=document.getElementById("forma");
    let tipo=document.getElementById("tipo").value;
    let descripcion=document.getElementById("descripcion").value;
    let valor=document.getElementById("forma").valor.value;
    if(descripcion !== "" && valor !== ""){
        if(tipo === "ingreso"){
            ingresos.push(new Ingreso(descripcion, +valor));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo === "egreso"){
            egresos.push(new Egreso(descripcion, +valor));
            cargarCabecero();
            cargarEgresos();
        }
    }
}