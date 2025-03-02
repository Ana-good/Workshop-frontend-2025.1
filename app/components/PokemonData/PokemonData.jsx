import { useEffect, useState } from 'react'
import { getPokemonsCards } from '../PokemonTCGapi/PokemonTCGapi'; //Importando função contendo api

export default function PokemonData({ id }) { //Definindo os dados das cartas
    const [data, setData] = useState();
    
    useEffect(() => {
        getPokemonsCards(`https://api.pokemontcg.io/v2/cards/${id}`)
            .then (response => setData(response.data))
            .catch(err => console.error(err));
    },  [id])
    // O useEffect pega o id das cartas de pokemon e a função getPokemonCards pega o id dos pokemons na api com .then, alem de que detecta erros no console com catch
    
    // Exibe o conteúdo das cartas
    return (
        <>  
            {data && //Verificação para garantir que o conteúdo dentro de data exista. Estrutura: {data && (...)}
                (<div key={data.id} style={{ display: 'flex', flexDirection: 'column', 
                alignItems: 'center', gap: '16px', fontWeight: 'semibold', padding: '40px', borderRadius: '10px'}}>
                    <img src= {data.images?.large} alt= {data.name} style={{width: '30px', height: '30px', borderRadius: '10px', objectFit: 'contain'}}/>
                    <p style={{fontSize: '20px', fontWeight: 'bold'}}>Nome: {data.name}</p>
                    <p>Número da Pokédex: {data.nationalPokedexNumbers}</p>
                    <p>Tipo: {data.types}</p>
                    <p>Fraquezas: {data.weaknesses}</p>
                    <p>Resistencias: {data.resistances}</p>
                    </div>
                   
                )
            }
        </>
    )
}
    
    
    
    
    
    
