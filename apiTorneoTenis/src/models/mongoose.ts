import mongoose from "mongoose";

// Esquema para los tenistas
const TenistaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    peso: {
        type: Number, // en KG
        required: true
    },
    altura: {
        type: Number, // en M
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    perfilATP: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        trim: true,
        required: true
    },
    titulos: {
        type: Number,
        required: true
    }
});

// Esquema para un set en un partido
const SetSchema = new mongoose.Schema({
    jugador1Puntaje: {
        type: Number,
        required: true
    },
    jugador2Puntaje: {
        type: Number,
        required: true
    }
});

// Esquema para los partidos
const PartidoSchema = new mongoose.Schema({
    jugador1: {
        type: String,
        required: true
    },
    jugador2: {
        type: String,
        required: true
    },
    ganador: {
        type: String,
        required: true
    },
    sets: {
        type: [SetSchema],
        required: true
    }
});

const TenistaModel = mongoose.model('Tenista', TenistaSchema);
const PartidoModel = mongoose.model('Partido', PartidoSchema);

export { TenistaModel, PartidoModel };
