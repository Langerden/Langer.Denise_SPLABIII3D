const URL = "http://localhost:3000/anuncios";

//Get Fetch Async
export const getAnunciosFetchAsync = async () => {
  let data;
  try {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error("Ocurrio un error");
    }

    data = await res.json();
    return data;

  } catch (error) {
    console.error(error);
  }
};

//Delete Fetch Asincronico
export const deleteAnunciosFetchAsync = async (id) => {
    try {
      const res = await fetch(`${URL}/${id}`, {method: "DELETE"});
    
      if (!res.ok) {
        throw new Error("Ocurrio un error");
      }
    }
    catch (error) {
        console.error(error);
    }
  };

