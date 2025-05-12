export interface InterfaceProductos {
  id: string
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoria_id: number
  imagen_url: string
  cantidad?: number,
  categoria: string,
}
