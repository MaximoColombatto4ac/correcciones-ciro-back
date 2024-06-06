import { Tenista } from "@src/classes/dataClasses/Tenista";
import DATABASE_DIR from "@src/constants/DatabaseInfo";
import Accessor from "@src/db/dbAccessor";
import { PartidoModel, TenistaModel } from "../models/mongoose";

const dbAccessor = new Accessor<Tenista>(DATABASE_DIR);

async function getOne(id: number): Promise<Tenista | undefined> {
  try {
    const tenista = await TenistaModel.findOne({ id });
    if (!tenista) {
      throw new Error(`No se encontró ningún tenista con el ID ${id}`);
    }
    return new Tenista(
      tenista.id,
      tenista.nombre,
      tenista.peso,
      tenista.altura,
      tenista.edad,
      tenista.perfilATP,
      tenista.pais,
      tenista.titulos
    );
  } catch (err) {
    throw err;
  }
}

async function persists(id: number): Promise<boolean> {
  try {
    return !!(await TenistaModel.findOne({ id }));
  } catch (err) {
    throw err;
  }
}

async function getAll(): Promise<Tenista[]> {
  try {
    const tenistas = await TenistaModel.find();
    if (tenistas) {
      return tenistas.map(tenista => new Tenista(
        tenista.id,
        tenista.nombre,
        tenista.peso,
        tenista.altura,
        tenista.edad,
        tenista.perfilATP,
        tenista.pais,
        tenista.titulos
      ));
    } else {
      return []; // Si no se encuentran tenistas, devuelve un array vacío
    }
  } catch (error) {
    throw error;
  }
}

async function add(tenista: Tenista): Promise<boolean | Tenista> {
  try {
    console.log(tenista);
    const newTenista = new TenistaModel({
      id: tenista.id,
      nombre: tenista.nombre,
      peso: tenista.peso,
      altura: tenista.altura,
      edad: tenista.edad,
      perfilATP: tenista.perfilATP,
      pais: tenista.pais,
      titulos: tenista.titulos
    });
    const savedTenista = await newTenista.save();
    return savedTenista;
  } catch (err) {
    throw err;
  }
}


async function update(tenista: Tenista): Promise<boolean> {
  try {
    return dbAccessor.update(tenista, Tenista.PATH);
  } catch (err) {
    throw err;
  }
}

async function delete_(id: number): Promise<boolean> {
  try {
    return dbAccessor.delete_(id, Tenista.PATH);
  } catch (err) {
    throw err;
  }
}

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
