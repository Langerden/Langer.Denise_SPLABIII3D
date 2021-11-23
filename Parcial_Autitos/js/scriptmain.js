import Anuncio_Auto from "./anuncioAuto.js"
import { getAnunciosFetchAsync} from "./fetchAsync.js";
import { agregarSpinner } from "./spinner.js";

let localData;
let article;

const URL = "http://localhost:3000/anuncios";

const getDatosAjax = (callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 299) {
                const datos = JSON.parse(xhr.responseText);
                callback(datos);
            } else {
                const statusText = xhr.statusText || "Ocurrio un error";
                console.error(`Error: ${xhr.status} : ${statusText}`);
            }
        }
    };
    xhr.open("GET", URL);
    xhr.send();
};

window.addEventListener("load", loadPageHandler());

async function loadPageHandler() {
    try {           
         getDatosAjax((datos)=>{
            localData = datos;            
            console.log('cargando anuncios', localData);            
            localData.forEach(item => {
                createDivs(item);
            });
          });        
    } catch (err) {
        console.error(err);
    }

    article = document.querySelector("#articles");    
    article.classList.add("row");
    article.classList.add("row-cols-1");
    article.classList.add("row-cols-md-4");
    article.classList.add("g-4");
    article.style.margin = "0.5rem";

}

function createDivs(item) {

    const div = document.createElement("div");
    div.classList.add("col");    
    div.classList.add("text-white");
    
    const card = document.createElement("div");
    card.classList.add("card");    
    card.classList.add("text-center");    
    card.classList.add("bg-dark");        
    card.classList.add("border");
    card.classList.add("rounded");
    card.classList.add("border-primary");

    const divBody = document.createElement("div");
    divBody.classList.add("card-body");
    divBody.style.padding = "0.75rem";

    const title = document.createElement("h2");
    title.classList.add("card-title");

    const description = document.createElement("p");
    description.classList.add("card-text");

    const price = document.createElement("p");
    price.id = "price";


    const puertas = document.createElement("p");
    puertas.style.display = "inline";
    puertas.style.margin = "1rem";

    const km = document.createElement("p");
    km.style.display = "inline";
    km.style.margin = "1rem";

    const potencia = document.createElement("p");
    potencia.style.display = "inline";    
    potencia.style.margin = "1rem";

    const puertasIcon = document.createElement("img");
    puertasIcon.src = "../imgs/source_icons_car-outline.svg";
    puertasIcon.style.width = "20px";

    const kmIcon = document.createElement("img");
    kmIcon.src = "../imgs/source_icons_clock-outline.svg";
    kmIcon.style.width = "20px";

    const potenciaIcon = document.createElement("img");
    potenciaIcon.src = "../imgs/source_icons_ev-plug.svg";
    potenciaIcon.style.width = "20px";

    const boton = document.createElement("a");        
    boton.classList.add("btn");
    boton.classList.add("btn-primary");
    boton.classList.add("btn-lg");
    boton.style.margin = "0.5rem";
    boton.innerHTML = "Ver Vehiculo";

    title.innerHTML = item.titulo;
    description.innerHTML = item.descripcion;
    price.innerHTML = "$" + item.precio;
    puertas.innerHTML = item.puertas;
    km.innerHTML = item.kms;
    potencia.innerHTML = item.potencia;

    divBody.appendChild(title);
    divBody.appendChild(description);
    divBody.appendChild(price);
    divBody.appendChild(puertasIcon);
    divBody.appendChild(puertas);
    divBody.appendChild(kmIcon);
    divBody.appendChild(km);
    divBody.appendChild(potenciaIcon);
    divBody.appendChild(potencia);
    // divBody.appendChild(boton);

    card.appendChild(divBody);
    card.appendChild(boton);
    div.appendChild(card);
    article.appendChild(div);
    
}
