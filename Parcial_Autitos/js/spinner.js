import { enableButtons } from './form.js';

export function agregarSpinner() {
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "../imgs/spinner.gif");
    spinner.setAttribute("alt", "imagen spinner");

    document.getElementById("spinner").appendChild(spinner);
    enableButtons(false);
}

export function eliminarSpinner() {
    enableButtons(true);
    document.getElementById("spinner").innerHTML = "";
}