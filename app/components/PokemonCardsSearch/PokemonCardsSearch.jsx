// 3. Nível (Médio):
//     - Consumir a API e exibir cards na tela de cartas
//     - Cada card deve mostrar o nome(name), tipos(types) e a imagem da carta Pokémon(image.large).
// 4. Nível (Difícil):
//     - Adicionar um campo de pesquisa para permitir que os usuários encontrem cartas específicas pelo nome ou tipo do Pokémon.

"use client"
import React, { useEffect, useState } from 'react';
import { getPokemonsCards } from '../PokemonTCGapi/PokemonTCGapi';
import PokemonData from '../PokemonData/PokemonData';

export default function PokemonCardsSearch(){

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [isSearchOn, setIsSearchOn] = useState(false);
  //Estados adicionais para controlar o dados no useEffect

  // Colocar o useEffect para disparar os resultados SOMENTE se o Search for acionado (criar nova função?)
  useEffect(() => {
      getPokemonsCards(`https://api.pokemontcg.io/v2/cards/?q=name:${search}`)
          .then (response => setData(response.data))
          .catch(err => console.error(err));
  },  []);
  // o useEffect pega o id das cartas de pokemon e a função getPokemonCards pega o id dos pokemons na api com .then, alem de que detecta erros no console com catch

  // Condição para exibir os dados SOMENTE se o usuário pesquisar no botão Search
  const filtro = isSearchOn ? data.filter((card) => card.name.toLowerCase().includes(search.toLowerCase())) : []; 
  //Obs: A função filter() retorna um novo array chamado de cards, o que representa os itens (cartas) dentro da função

  // Função com a condição acima aplicada para disparar ao pesquisar no Botão Search e atualizar os valores da pesquisa
  const SearchChange = (e) => {
    setSearch(e.target.value); 
    setIsSearchOn(true);
  }

  return (
    <main style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column',
      background: 'red', alignItems: 'center', width: '100%', minHeight: '100vh', gap: '30px',
      fontFamily: 'Arial' }}>
    
      <img style={{width: "250px"}} src="/images/pokemontcglogo.png" alt="pokemon tcg logo" /> 
      {/* imagem logo */}
            
      <input style={{textAlign: 'center', border: 'none', background: 'darkred', borderRadius: '4px',
        color: 'white', height: '30px'
      }} type="text" onChange={SearchChange} placeholder='Pesquise uma carta' /> {/* evento de filtro dispara ao pesquisar a carta */}
      {/* barra de pesquisa */}
      <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-around', gap: '10px', padding: '8px' }}>
        {filtro.map((card) => (<PokemonData key={card.id} id={card.id} />))} 
      </div>
      {/* mostra as cartas ao pesquisar */}
      
    </main>
  )
}