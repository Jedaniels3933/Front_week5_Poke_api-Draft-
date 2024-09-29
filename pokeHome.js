
async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Error fetching data', alert("Pokemon not found"));
    }
}

document.getElementById("pokemon-form").addEventListener('submit', async (event) => {
    event.preventDefault();

    const pokemonNameInput = document.getElementById("search-pokemon");
    if (pokemonNameInput) {
        const pokemonName = pokemonNameInput.value.toLowerCase();
        try {
            const data = await fetchPokemonData(pokemonName);
            const pokeInfoElement = document.getElementById("pokemon-info");
            pokeInfoElement.innerHTML = `
                <h2>Name: ${data.name.toUpperCase()}</h2>
                <img src="${data.sprites.front_default}" style="width: 300px; height: 300px;" />
                
                <p>Pokemon ID: ${data.id}</p>
                <p>Pokemon Type: ${data.types[0].type.name}</p>
                <p>Pokemon Ability: ${data.abilities[0].ability.name}</p>
                <p>Height: ${data.height} ft</p>
                <p>Weight: ${data.weight} lbs</p>
                <p>Stats: ${data.statistic} </p>
            `;
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else {
        console.error('Input element not found');
    }

    pokemonNameInput.value = '';
});