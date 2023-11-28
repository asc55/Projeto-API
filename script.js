const apiUrl = "https://pokeapi.co/api/v2"
const elementoPokemons = document.getElementById("pokemons")
const elementoPokemonTemplate = document.getElementById("pokemon-template").firstElementChild

const atualizarListaDePokemons = async(limit=10, offset=0) => {
    const url = `${apiUrl}/pokemon?limit=${limit}&offset=${offset}`
    const response = await fetch(url)
    const dados = await response.json()

    mostrarPokemons(dados.results)
}

const carregarPokemon = async(elemento, url) => {
    const response = await fetch(url)
    const dados = await response.json()

    elementoImagem = elemento.querySelector(".pokemon-imagem")
    elementoImagem.src = dados.sprites.front_default
}

const mostrarPokemons = (pokemons) => {
    const novaLista = []

    pokemons.forEach(({name, url}) => {
        const novoElemento = elementoPokemonTemplate.cloneNode(true)
        carregarPokemon(novoElemento, url)

        elementoNome = novoElemento.querySelector(".pokemon-nome")
        elementoNome.textContent = name
    
        novaLista.push(novoElemento)
    })

    elementoPokemons.replaceChildren(...novaLista)
}

window.onload = (event) => {
    atualizarListaDePokemons()
}