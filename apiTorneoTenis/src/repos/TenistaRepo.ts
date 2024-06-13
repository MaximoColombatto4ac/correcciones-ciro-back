import { Tenista } from "@src/classes/dataClasses/Tenista";
import { PartidoModel, TenistaModel } from "../models/mongoose";


async function getOne(_id: string): Promise<Tenista> {
  try {
    const tenista = await TenistaModel.findOne({ _id });
    if (tenista) {
      return {
        _id: tenista._id.toString(),
        nombre: tenista.nombre,
        peso: tenista.peso,
        altura: tenista.altura,
        edad: tenista.edad,
        perfilATP: tenista.perfilATP,
        pais: tenista.pais,
        titulos: tenista.titulos
      }
    }
    throw new Error(`No se encontró ningún tenista con el ID ${_id}`);
  } catch (err) {
    throw err;
  }
}

async function persists(_id: string): Promise<boolean> {
  try {
    return !!(await TenistaModel.findOne({ _id }));
  } catch (err) {
    throw err;
  }
}

async function getAll(): Promise<Tenista[]> {
  try {
    const tenistas = await TenistaModel.find();
    if (tenistas) {
      return tenistas.map(tenista => {
        return{
          _id: tenista._id.toString(),
          nombre: tenista.nombre,
          peso: tenista.peso,
          altura: tenista.altura,
          edad: tenista.edad,
          perfilATP: tenista.perfilATP,
          pais: tenista.pais,
          titulos: tenista.titulos
        }
      });
    } else {
      return []; // Si no se encuentran tenistas, devuelve un array vacío
    }
  } catch (error) {
    throw error;
  }
}

async function add(tenista: Tenista): Promise<boolean> {
  try {
    console.log(tenista);
    
    const newTenista = new TenistaModel({
      nombre: tenista.nombre,
      peso: tenista.peso,
      altura: tenista.altura,
      edad: tenista.edad,
      perfilATP: tenista.perfilATP,
      pais: tenista.pais,
      titulos: tenista.titulos
    });
    console.log(newTenista);
    
    await newTenista.save();
    return true;
  } catch (err) {
    throw err;
  }
}


async function update(tenista: Tenista): Promise<boolean> {
  try {
    const updatedTenista = await TenistaModel.findOneAndUpdate(
      { _id: tenista._id }, // Filtro para encontrar el tenista por su id
      {
        nombre: tenista.nombre,
        peso: tenista.peso,
        altura: tenista.altura,
        edad: tenista.edad,
        perfilATP: tenista.perfilATP,
        pais: tenista.pais,
        titulos: tenista.titulos
      },
      { new: true, runValidators: true } // Opciones: devolver el nuevo documento y ejecutar las validaciones
    );

    if (updatedTenista) {
      console.log("Tenista actualizado:", updatedTenista);
      return true;
    } else {
      console.log("No se encontró el tenista con el id proporcionado.");
      return false;
    }
  } catch (err) {
    console.error("Error al actualizar el tenista:", err);
    throw err;
  }
}

async function delete_(_id: string): Promise<boolean> {
  try {
    const deletedTenista = await TenistaModel.findOneAndDelete({ _id });

    if (deletedTenista) {
      console.log("Tenista eliminado:", deletedTenista);
      return true;
    } else {
      console.log("No se encontró el tenista con el id proporcionado.");
      return false;
    }
  } catch (err) {
    console.error("Error al eliminar el tenista:", err);
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
