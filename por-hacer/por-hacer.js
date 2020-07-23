const fs = require('fs');

let listadoporHacer = [];

const guardarDb = ()=>{
    let data = JSON.stringify(listadoporHacer);

    fs.writeFile('db/data.json',data,(err)=>{
        if(err) throw new Error('No se pudo grabar',err);
    })
}
const cargarDB = ()=>{
    try{
        listadoporHacer = require('../db/data.json');
    }catch{
        listadoporHacer = [];
    }
}
const getListado = ()=>{
    cargarDB();

    return listadoporHacer;
}
const crear = (descripcion)=>{
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoporHacer.push(porHacer);
    guardarDb();
    return porHacer;

}
const actualizar = (descripcion ,completado = true)=>{
    cargarDB();
    let index = listadoporHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if(index >=0){
        listadoporHacer[index].completado = completado;
        guardarDb();
        return true;
    }else{
        return false;
    }
}
const borrar = (descripcion)=>{
    cargarDB();
    let nuevoListado = listadoporHacer.filter(tarea => tarea.descripcion !== descripcion);
    if(listadoporHacer.length === nuevoListado.length){
        return false;
    }else{
        listadoporHacer = nuevoListado;
        guardarDb();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}