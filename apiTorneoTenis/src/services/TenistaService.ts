import TenistaRepo from '@src/repos/TenistaRepo';
import { Tenista } from '@src/classes/dataClasses/Tenista';

function getAll(): Promise<Tenista[]> {
  try{
    return TenistaRepo.getAll();
  }
  catch(err){
    throw err
  }
}

async function getOne(id: string): Promise<Tenista | undefined> {
  try {
    const persist = await TenistaRepo.persists(id);
    if (persist) {
      return TenistaRepo.getOne(id);
    } else {
      throw new Error(`No existe ningún tenista con el ID ${id}`);
    }
  } catch (err) {
    throw err;
  }
}

function addOne(tenista: Tenista): Promise<boolean | Tenista> {
  try{
    return TenistaRepo.add(tenista);
  }
  catch(err){
    throw err
  }
}

async function updateOne(tenista: Tenista): Promise<boolean> {
  try{
    return TenistaRepo.update(tenista);
  }
  catch(err){
    throw err
  }
}

async function _delete(id: string): Promise<boolean> {
  try{
    return TenistaRepo.delete(id);
  }
  catch(err){
    throw err
  }
}

export default {
  getAll,
  getOne,
  addOne,
  updateOne,
  delete: _delete,
} as const;
