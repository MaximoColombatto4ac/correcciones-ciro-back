import { Partido } from '@src/classes/dataClasses/Partido';
import { PartidoModel } from "../models/mongoose";

async function getOne(_id: string): Promise<Partido | undefined> {
  try {
    const partido = await PartidoModel.findOne({ _id }).exec();
    return partido ? partido.toObject() as Partido : undefined;
  } catch (err) {
    throw err;
  }
}

async function persists(_id: string): Promise<boolean> {
  try {
    const partido = await PartidoModel.findOne({ _id }).exec();
    return partido != undefined;
  } catch (err) {
    throw err;
  }
}

async function getAll(): Promise<Partido[]> {
  try {
    const partidos = await PartidoModel.find().exec();
    return partidos.map(partido => partido.toObject() as Partido);
  } catch (err) {
    throw err;
  }
}

async function add(partido: Partido): Promise<boolean | Partido> {
  try {
    const newPartido = new PartidoModel(partido);
    const savedPartido = await newPartido.save();
    return savedPartido.toObject() as Partido;
  } catch (err) {
    throw err;
  }
}

async function update(partido: Partido): Promise<boolean> {
  try {
    const updatedPartido = await PartidoModel.findOneAndUpdate(
      { _id: partido._id },
      partido,
      { new: true, runValidators: true }
    ).exec();

    return updatedPartido != null;
  } catch (err) {
    throw err;
  }
}

async function delete_(_id: string): Promise<boolean> {
  try {
    const deletedPartido = await PartidoModel.findOneAndDelete({ _id }).exec();

    if (deletedPartido) {
      console.log("Partido eliminado:", deletedPartido);
      return true;
    } else {
      console.log("No se encontró el partido con el _id proporcionado.");
      return false;
    }
  } catch (err) {
    console.error("Error al eliminar el partido:", err);
    throw err;
  }
}

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_
} as const;
