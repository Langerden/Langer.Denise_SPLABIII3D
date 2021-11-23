const URL = "http://localhost:3000/anuncios";

export const postAnuncioFetch = (nuevoAnuncio) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(nuevoAnuncio),
    };

    fetch(URL, options)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(`Error: ${err.status} : ${err.statusText}`);
      });
};

//Update Fetch
export const updateAnunciosFetch = (anuncioUpdate) => {
    
    const options = {
        method: "PUT",
        headers: {
        "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(anuncioUpdate),
    };
    
    fetch(`${URL}/${anuncioUpdate.id}`, options)
        .then((res) => {
          return res.ok ? res.json() : Promise.reject(res);
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(`Error: ${err.status} : ${err.statusText}`);
        });
};