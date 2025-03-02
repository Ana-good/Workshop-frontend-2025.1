// 1. Um header que contenha no mínimo a opção de *INÍCIO e CARTAS.*
// 2. Nível (Fácil):
//    Estilizar a tela de início com base nas suas preferências, trazendo referência ao tema Pokémon.

"use client"
import React, { useEffect, useState } from 'react';
import { getPokemonsCards } from '../PokemonTCGapi/PokemonTCGapi';
import PokemonData from '../PokemonData/PokemonData';
import { useRouter } from 'next/navigation';

export default function Header() {
  
  // Funções para os botões 

  const [data, setData] = useState([]);
  const [isButtonOn, setIsButtonOn] = useState(false);
  // Estados adicionais para controlar o dados no useEffect
  
  // O useEffect dispara os resultados SOMENTE se o button Cards for acionado 
  useEffect(() => {
    if (isButtonOn){
      getPokemonsCards(`https://api.pokemontcg.io/v2/cards/`)
      .then (data => setData(data.results))
      .catch(err => console.error(err));
    }
  },  [isButtonOn]);
  // O useEffect pega o id das cartas de pokemon e a função getPokemonCards pega o id dos pokemons na api com .then, alem de que detecta erros no console com catch

  // Função para atualizar o estado do botão quando for clicado
  const ButtonChange = () => {
    setIsButtonOn(true);
  }
  //definindo o router como uma função de retornar a pagina inicial
  const router = useRouter();

  return (
    // Conteúdo do header
    <main style={{ display: 'flex', width: '100%',
      background: 'darkred', fontFamily: 'Arial'}}>
      {/* imagem de pokebola na direita */}
      <img style={{width: "50px"}} src="/images/pokeball.png"  alt="imagem pokebola"> 
        
      </img>
      <div style={{display: 'flex', gap: '50px', marginLeft: 'auto', paddingRight: '50px' }}> 
        {/* botao de inicio na esquerda*/}
        <button style={{color: 'white', fontWeight: 'bold', cursor: 'pointer'}} onClick={() => router.push('/')}> Início </button>

        {/* botao de cartas na esquerda */}
        <button style={{color: 'white', cursor: 'pointer', fontWeight: 'bold',}} onClick={ButtonChange}> Cartas </button>

      </div>

      {isButtonOn && data?.length > 0 && (
        <div>
          {data.map((card) => (<PokemonData key={card.id} id={card.id} />))}
        </div>
      )}
      {/* mostra as cartas ao clicar no botão*/}

    </main>
    

  )
}

