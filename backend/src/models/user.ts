export interface User {
  rut: string;              // UID
  nombre: string;
  fechaNacimiento: string;
  cantidadHijos: number;
  correos: string[];
  telefonos: string[];
  direcciones: string[];
}

export let users: User[] = []; 