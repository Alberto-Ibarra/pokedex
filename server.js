const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride  = require('method-override');

const pokemonSeed = require('./models/pokemon.js');
const Pokemon = require('./models/pokemonSchema.js');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));


// app.get('/pokemon/seed', (req,res)=>{
//     Pokemon.create(pokemonSeed, (req,seed)=>{
//         console.log(seed);
//     })
// })

app.get('/', (req,res)=>{
    res.send('Hello');
})

//render add pokemon
app.get('/pokemon/new', (req,res)=>{
    res.render('new.ejs')
});

//post pokemon
app.post('/pokemon', (req,res)=>{
    let data = {
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        stats:{
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense: req.body.spdefense,
            speed: req.body.speed
        }
    }

    Pokemon.create(data, (err, createPokemon)=>{
            res.redirect('/pokemon')
    })

});

//render all pokemon
app.get('/pokemon', (req,res)=>{
    Pokemon.find({}, (err, allPokemon)=>{
        res.render('index.ejs', {
            allpokemon: allPokemon
        })
    })
});


//render one pokemon
app.get('/pokemon/:id', (req,res)=>{
    Pokemon.findById(req.params.id, (err, foundPokemon)=>{
        res.render('show.ejs', {
            pokemon: foundPokemon 
        })
    })
})

//render edit page and grabs id
app.get('/pokemon/:id/edit', (req,res)=>{
    Pokemon.findById(req.params.id, (err, foundPokemon)=>{
        res.render('edit.ejs', {
            pokemon: foundPokemon
        });
    });
});

//updates id grabbed
app.put('/pokemon/:id', (req,res)=>{
    let data = {
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        stats:{
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            spattack: req.body.spattack,
            spdefense: req.body.spdefense,
            speed: req.body.speed
        }
    }
    Pokemon.findByIdAndUpdate(req.params.id, data, {new:true}, (err, update)=>{
        res.redirect('/pokemon')
    })
})

//delete one
app.delete('/pokemon/:id', (req,res)=>{
    Pokemon.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/pokemon')
    })
})


mongoose.connect('mongodb://localhost:27017/pokemon',()=>{
    console.log('connection to mongo made');
});

app.listen(3000, ()=>{
    console.log("listening....");
})