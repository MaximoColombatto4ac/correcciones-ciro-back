
export interface Tenista  {// cambiamos a interface
  _id: string;// ids a string porque en mongo se manejan con objectId
  nombre: string;
  peso: number; // KG
  altura: number; // M
  edad: number;
  perfilATP: string;
  pais: string;
  titulos: number;// cambiamos los titulos a numeros por simplicidad
}
export function isTenista(tenista: any): boolean {
  return (
    typeof tenista === 'object'
  );
}