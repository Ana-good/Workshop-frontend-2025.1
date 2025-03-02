import axios from "axios";

const API_KEY= "e1e36c9f-9fd6-470d-b06a-621b59346b6e"; //Chave para requisições na Api

export async function getPokemonsCards(url = "https://api.pokemontcg.io/v2/cards") {
    const response = await axios.get(url, {headers: {"X-Api-Key": API_KEY}});
    return response.data;
}