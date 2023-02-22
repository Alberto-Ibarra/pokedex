const mongoose=require('mongoose');

const pokemonSchema = new mongoose.Schema({
    id: String,
    name: String,
    img: String,
    type: [String],
    stats: {
        hp: String,
        attack: String,
        defense: String,
        spattack: String,
        spdefense: String,
        speed: String
    } 
});

const pokemonCollection = mongoose.model('Pokemon', pokemonSchema);

module.exports = pokemonCollection;