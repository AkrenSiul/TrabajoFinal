export interface InterfaceProductos {
  id: string
  nombre: string
  descripcion: string
  precio: string
  stock: string
  categoria_id: string
  imagen_url: string
  cantidad?: number,
  categoria: string,
}
