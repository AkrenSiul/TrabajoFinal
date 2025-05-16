export interface InterfacePedidoDetalles {
  id: string;
  usuario_id: string;
  fecha_pedido: string;
  estado: string;
  total: string;
  detalles: DetallePedido[];
}

export interface DetallePedido {
  id: string;
  pedido_id: string;
  producto_id: string;
  cantidad: string;
  precio_unidad: string;
  producto: string;
}
