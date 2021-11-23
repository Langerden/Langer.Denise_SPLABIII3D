import Anuncio_Auto from "./anuncioAuto.js";

export function formData(dataInputs) {
        console.log(dataInputs.formId.value);
        return new Anuncio_Auto(
                dataInputs.formId.value,
                dataInputs.txtTitulo.value,
                dataInputs.sctTransaccion.value,
                dataInputs.txtDesc.value,
                dataInputs.numPrecio.value,
                dataInputs.numPuertas.value,
                dataInputs.numKM.value,
                dataInputs.numPower.value);
}

export function updateForm(tr, dataInputs) {
        dataInputs.formId.value = tr.id;
        dataInputs.txtTitulo.value = tr.children[0].textContent;
        dataInputs.sctTransaccion.value = tr.children[1].textContent;
        dataInputs.txtDesc.value = tr.children[2].textContent;
        dataInputs.numPrecio.value = tr.children[3].textContent;
        dataInputs.numPuertas.value = tr.children[4].textContent;        
        dataInputs.numKM.value = tr.children[5].textContent;
        dataInputs.numPower.value = tr.children[6].textContent;
}

export function showButtons() {
        document.querySelector('#btnSubmit').classList.add('hidden');
        document.querySelector('#btnActualizar').classList.remove('hidden');
        document.querySelector('#btnEliminar').classList.remove('hidden');
}

export function hideButtons() {
        document.querySelector('#id').value = "";
        document.querySelector('#btnSubmit').classList.remove('hidden');
        document.querySelector('#btnActualizar').classList.add('hidden');
        document.querySelector('#btnEliminar').classList.add('hidden');
}

export function enableButtons(enable) {
        if (enable) {
                document.querySelector('#btnSubmit').disabled = false;
                document.querySelector('#btnCancelar').disabled = false;
                document.querySelector('#btnActualizar').disabled = false;
                document.querySelector('#btnEliminar').disabled = false;
        } else {
                document.querySelector('#btnSubmit').disabled = true;
                document.querySelector('#btnCancelar').disabled = true;
                document.querySelector('#btnActualizar').disabled = true;
                document.querySelector('#btnEliminar').disabled = true;
        }
}