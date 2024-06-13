import { SetTenis } from "../other/SetTenis";
import { Tenista, isTenista } from "./Tenista";

export interface Partido { // cambiamos a interface
    _id: string;// ids a string porque en mongo se manejan con objectId
    jugador1: string;
    jugador2: string;
    ganador: string;
    sets: SetTenis[];
}
export function isPartido(partido: any): boolean{
  return(
    typeof partido === 'object' &&
    'id' in partido && typeof partido.id === 'number' &&
    'jugador1' in partido && isTenista(partido.jugador1) &&
    'jugador2' in partido && isTenista(partido.jugador2) &&
    'ganador' in partido && isTenista(partido.ganador) &&
    'sets' in partido && typeof partido.sets === 'object' &&
    partido.sets.every((set: any) => typeof set === 'object') &&
    (partido.jugador1.id == partido.ganador.id || partido.jugador1.id == partido.ganador.id)
  )
}