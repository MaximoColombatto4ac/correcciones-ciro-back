
export class Tenista implements dataObject {
  static PATH = "tenistas.json";
  id: number;
  nombre: string;
  peso: number; // KG
  altura: number; // M
  edad: number;
  perfilATP: string;
  pais: string;
  titulos: number;

  constructor(
    id: number,
    nombre: string,
    peso: number,
    altura: number,
    edad: number,
    perfilATP: string,
    pais: string,
    titulos: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.peso = peso;
    this.altura = altura;
    this.edad = edad;
    this.perfilATP = perfilATP;
    this.pais = pais;
    this.titulos = titulos;
  }

  static isTenista(tenista: any): boolean {
    return (
      typeof tenista === 'object'
    );
  }
}
