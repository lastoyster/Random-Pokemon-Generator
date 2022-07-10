let input = document.querySelector("#search");
let randomBtn = document.querySelector("#random");

const totalPokemon = 802;

let nameHeading = document.querySelector("#name");
let idHeading = document.querySelector("#id");
let imgTag = document.querySelector("img");

let statContainer = document.querySelector(".stats");
let movesContainer = document.querySelector(".moves");

let display = document.querySelector("#display");

input.addEventListener("keyup", (e)=> {

	let inputVal = input.value;

	if(e.key === "Enter" && inputVal !== "") {
		search(inputVal.toLowerCase(), null);
	}
});

random.addEventListener("click", ()=> {
	let randomNum = Math.floor(Math.random()*totalPokemon)+1;

	search(null, randomNum)
});


// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();

function search(name, id) {

	// Open a new connection, using the GET request on the URL endpoint

	if(id === null) {
		request.open('GET', `https://pokeapi.co/api/v2/pokemon/${name}/`, true);
	
	} else {
		request.open('GET', `https://pokeapi.co/api/v2/pokemon/${id}/`, true);
	}

	request.onload = function () {

		let res = request.response;
		let obj = JSON.parse(res);	

		let pokemonID = obj.id;
		let pokemonName = (obj.name).toUpperCase();
		let imgURL = obj.sprites.front_default;

		idHeading.textContent = `#${pokemonID}`;
		nameHeading.textContent = pokemonName;
		
		imgTag.setAttribute("src", imgURL);
		imgTag.setAttribute("alt", `Image of ${pokemonName}`);

		let stats = obj.stats;

		statContainer.innerHTML = "";

		for(let i=0; i<stats.length; ++i) {

			let statName = stats[i].stat.name.toUpperCase();

			if(statName === "SPECIAL-DEFENSE") {
				statName = "SPL-DEFENSE";
			
			} else if(statName === "SPECIAL-ATTACK") {
				statName = "SPL-ATTACK"
			}

			statContainer.innerHTML += `<h3 class="stat">${statName}: ${stats[i].base_stat}</h3>`;
		}

		let movesObj = obj.moves;

		let moves = [];
		for(let moveObj of movesObj) {
			moves.push(moveObj.move.name)
		}

		moves.sort();

		movesContainer.innerHTML = "";

		for(let i=0; i<moves.length; ++i) {

			movesContainer.innerHTML += `<h4 class="move">${moves[i]}</h4>`;
		}

		display.classList.remove("hidden");
	 }

	// Send request
	request.send();	
}