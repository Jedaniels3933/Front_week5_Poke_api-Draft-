let arr = []

const init = () => {
    fetchAllPokemon()
}

const fetchAllPokemon = async() => {
    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`)
        let data = await res.json()
        console.log(data)
        fetchEachPokemon(data.results)
    } catch (error) {
        console.error("Error fetching all Pokémon:", error)
    }
}

const fetchSinglePokemon = async (pokemon) => {
    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // Fixed URL
        let data = await res.json()
        return data
    } catch (error) {
        console.error(`Error fetching Pokémon ${pokemon}:`, error)
    }
}

const fetchEachPokemon = async (pokemon) => {
    for (let i = 0; i < pokemon.length; i++) {
        let singlePokemon = await fetchSinglePokemon(pokemon[i].name)
        if (singlePokemon) {
            arr.push(singlePokemon)
        }
    }
    console.log(arr)
    ShowPokemon(arr)
}

const ShowPokemon = (pokemon) => {
    const output = document.querySelector(`.output`)
    const map = pokemon.map(each => {
        return `
            <div>
                <h1>${each.name}</h1>
                <img src="${each.sprites?.front_default || 'default-image.png'}" alt="${each.name}" />
           
                <span> ${each.types[0].type.name}</span>
                <span>${each.types.length> 1 ? each.types[1].type.name : ''}</span>

            </div>
            
            

        
        `
    }).join('')
    return output.innerHTML = map
}

// Initialize the process
init()