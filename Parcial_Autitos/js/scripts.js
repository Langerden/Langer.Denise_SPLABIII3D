import Anuncio_Auto from "./anuncioAuto.js";
import { createTable, updateTable } from "./tablaDinamica.js";
import { agregarSpinner, eliminarSpinner } from "./spinner.js";
import { formData, updateForm, showButtons, hideButtons } from "./form.js";

import { getAnunciosFetchAsync, deleteAnunciosFetchAsync } from "./fetchAsync.js";
import { postAnuncioFetch, updateAnunciosFetch } from "./fetchPromises.js";

let localData;
const btnFiltrarTodos = document.getElementById('btnFiltroTodos');
const btnFiltrarAlquiler = document.getElementById('btnFiltroAlquiler');
const btnFiltrarVentas = document.getElementById('btnFiltroVenta');
const cxBoxs = document.querySelectorAll('.cBox');
const txtFiltro = document.getElementById('txtFiltro');
const $formulario = document.forms[0];

window.addEventListener("load", loadPageHandler());

async function loadPageHandler() {
    //cargo anuncios
    try {
        agregarSpinner();
        localData = await getAnunciosFetchAsync();    
    }
    catch (err) {
        console.error(err);
    }
    finally {
        eliminarSpinner();
    }

    //hanlder del click
    document.addEventListener("click", handlerClick);

    //cargar lista
    if (localData.length > 0) {
        updateTable(localData);
    }

    //hanlder submit
    $formulario.addEventListener("submit", handlerSubmit);

    //botones filtros
    btnFiltrarTodos.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            agregarSpinner();
            filtroTodos(await getAnunciosFetchAsync());
        } catch (err) {
            console.log(err);
        }
        finally {
            eliminarSpinner();
        }
    });

    //botones filtros
    btnFiltrarAlquiler.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            agregarSpinner();
            filtroAlquiler(await getAnunciosFetchAsync());
        } catch (err) {
            console.log(err);
        }
        finally {
            eliminarSpinner();
        }
    })

    //botones filtros
    btnFiltrarVentas.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            agregarSpinner();
            filtroVenta(await getAnunciosFetchAsync());
        } catch (err) {
            console.log(err);
        }
        finally {
            eliminarSpinner();
        }
    });

    //botones filtros
    cxBoxs.forEach(el => { mapearTabla(el, localData); });

}

//Manejo el evento click dentro de TODA la pagina
async function handlerClick(e) {
    if (e.target.matches("td")) {
        showButtons();
        updateForm(e.target.parentElement, $formulario.elements);
    }
    if (e.target.matches("#btnCancelar")) {
        hideButtons();
    }
    if (e.target.matches("#btnEliminar")) {
        let id = $formulario.elements.formId.value;
        try {
            agregarSpinner();
            await deleteAnunciosFetchAsync(id);
            localData = await getAnunciosFetchAsync();
            updateTable(localData);
        } catch (err) {
            console.error(err);
        }
        finally {
            hideButtons();
            eliminarSpinner();
            $formulario.reset();
        }
    }
};

async function handlerSubmit(e) {

    e.preventDefault();

    try {
        const formAnuncio = formData($formulario.elements);
        formAnuncio.id === '' ? await postAnuncioFetch(formAnuncio) : await updateAnunciosFetch(formAnuncio);
        agregarSpinner();
        localData = await getAnunciosFetchAsync();
        updateTable(localData);
    } catch (err) {
        console.log(err);
    }
    finally {
        hideButtons();
        eliminarSpinner();
        $formulario.reset();
    }
}


//Filtros
function filtroTodos(listAux) {  
    txtFiltro.value = "N/A";
    cxBoxs.forEach( el  =>  { mapearTabla( el, listAux ); });
    updateTable(listAux);    
}
  
function filtroAlquiler(listAux) {
    cxBoxs.forEach(el => { el.checked = true; });
    const anunciosAlquiler = listAux.filter(an => an.transaccion === 'Alquiler');
    const precios = anunciosAlquiler.map(an => parseInt(an.precio));
    const totalPrecios = precios.reduce((acc, an) => acc + an, 0);

    const resultado = Math.round(totalPrecios / precios.length);

    txtFiltro.value = resultado;

    cxBoxs.forEach(el => { mapearTabla(el, anunciosAlquiler); });
    updateTable(anunciosAlquiler);
}
  
function filtroVenta(listAux) {
    cxBoxs.forEach(el => { el.checked = true; });
    const anunciosVentas = listAux.filter( an => an.transaccion === 'Venta' );
    const precios = anunciosVentas.map( an => parseInt( an.precio ));
    const totalPrecios = precios.reduce( ( acum, val ) => acum + val, 0);
    const resultado = Math.round (totalPrecios / precios.length);
  
    txtFiltro.value = resultado;
  
    cxBoxs.forEach( el  =>  { mapearTabla( el, anunciosVentas ); });
    
    updateTable(anunciosVentas);
  
}
  
async function mapearTabla(cbox, anunciosAux) {
    
    cbox.addEventListener( 'click', async() => { 
            let listAux = anunciosAux.map( anuncio => {
            let auxObj = {};  
            for (const key in anuncio) {
                if (document.getElementById('cBox'+key).checked){
                  auxObj[key] = anuncio[key];
                }
            }
            
            return auxObj;
        })
        updateTable(listAux);
    });
};
