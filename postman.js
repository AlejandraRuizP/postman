window.onload = ()=>{
        const verbo             = document.querySelector('#verb');
        const inputText         = document.querySelector('#url');
        const datosPost         = document.querySelector('#datos-post');
        const respuestaJson     = document.querySelector('#respuesta-json');
        const btnSend           = document.querySelector('#btn-send');
        const historial         = document.querySelector('#history');
        const btnDelete         = document.querySelectorAll('#btn-deleteTest');
        let arrBusquedas        = JSON.parse(localStorage.getItem("arrBusquedas")) || [];
        let id                  = 0;
        let obj                 = {"key":"value"}
        datosPost.innerHTML     =JSON.stringify(obj, undefined, 4);

    const postData = async (url,datos,verbo)=>{
        let response = await fetch(url,{
            method:verbo,
            headers:{'Content-Type':'Application/json'},
            body: datos
        })
        if(response.ok){
            let datosResponse = await response.json()
            console.log(datosResponse)
            console.log(response.status)
            respuestaJson.innerHTML=JSON.stringify(datosResponse, undefined, 4);
        }
        
    }

    const getData = async (url)=>{
        let response = await fetch(url);
        if(response.ok){
            let dataGet = await response.json();
            console.log(dataGet);
            respuestaJson.innerHTML=JSON.stringify(dataGet, undefined, 4);
        }
    }

    const deleteData = async (url,verbo)=>{
        let response = await fetch(url,{
            method:verbo
        });
        if(response.ok){
            respuestaJson.innerHTML='Deleted!';

        }
    }
    const setBusquedas = (datos,id)=>{
        let divBusqueda = document.createElement('div');
        divBusqueda.id = 'busqueda';
        divBusqueda.innerHTML = `<div id="texto-busqueda">
        <p>${datos} </p>
        </div>`
        let btnDelete= document.createElement('button');
        btnDelete.id= id;
        btnDelete.innerText='X'
        
        btnDelete.addEventListener('click',(e)=>{
            console.log(e.target.id)
            arrBusquedas =  arrBusquedas.filter( b => {
                return b.id != e.target.id
            })
            localStorage.setItem("arrBusquedas",JSON.stringify(arrBusquedas));
            divBusqueda.remove();
        })
        divBusqueda.appendChild(btnDelete);
        historial.appendChild(divBusqueda);
    };

    const busquedas = ()=>{
        if(inputText.value != ""){
            let texto = {
                id: id++,
                info :inputText.value
            }
            arrBusquedas.push(texto);

            if(verbo.value=='GET'){
                getData(inputText.value,verbo);
            }
            if(verbo.value=='PUT' || verbo.value=='POST' ){
                postData(inputText.value,datosPost.value,verbo.value);
            }
            if(verbo.value=='DELETE'){
                deleteData(inputText.value,verbo.value);
            }

            localStorage.setItem("arrBusquedas",JSON.stringify(arrBusquedas));
            setBusquedas(texto.info,texto.id);
        }
    }

    btnSend.addEventListener('click',()=>{
       busquedas();
    })
    inputText.addEventListener('keyup',(e)=>{
        if(e.key=='Enter'){
            busquedas();
        }
    })
    arrBusquedas.map( x => setBusquedas(x.info,x.id));
}