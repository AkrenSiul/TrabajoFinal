import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceProductos} from '../common/productos';
import {InterfacePedidoDetalles} from '../common/pedido-detalles';

@Injectable({
  providedIn: 'root'
})
export class ApiPanaderiaService {
  private readonly http: HttpClient = inject(HttpClient);
  private API_URL = 'http://localhost:8000/api/'
  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  );

  getTest(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/test')
  }

  // USUARIOS

  postLogin(usuario: string, contrasenya: string): Observable<any> {
    return this.http.post(this.API_URL+'login', {usuario, contrasenya}, {headers: this.headers});
  }
  postRegistro(formData: any): Observable<any> {
    return this.http.post(this.API_URL+'registro', formData, {headers: this.headers})
  }
  logOut(): Observable<any> {
    return this.http.get(this.API_URL+'logout', {headers: this.headers})
  }
  getUsuarios(): Observable<any> {
    return this.http.get(this.API_URL+'usuarios', {headers: this.headers})
  }
  deleteUsuarios(id: string): Observable<any> {
    return this.http.delete(this.API_URL+'usuario/delete/'+id, {headers: this.headers});
  }
  patchUsuario(id: string, usuarioModificado: any): Observable<any> {
    return this.http.patch(this.API_URL+'/usuario/update/'+id, usuarioModificado, {headers: this.headers});
  }

  // PRODUCTOS

  getProducts(url: string): Observable<InterfaceProductos[]> {
    return this.http.get<InterfaceProductos[]>(url, {headers: this.headers});
  }
  getProduct(id: string): Observable<any> {
    return this.http.get<any>(this.API_URL+'producto/'+id, {headers: this.headers});
  }
  createProduct(producto: FormData) {
    return this.http.post(this.API_URL+'producto/crearProducto', producto);
  }
  updateProduct(id: string, productoUpdate: FormData) {
    return this.http.post(this.API_URL+'producto/update/'+id, productoUpdate);
  }
  deleteProduct(id: string)  {
    return this.http.delete(this.API_URL+'producto/deleteProducto/'+id);
  }

  // CATEGORIAS

  getCategorias() {
    return this.http.get(this.API_URL+'producto/categoria');
  }


  getCategoriaAll(): Observable<any> {
    return this.http.get(this.API_URL+'categorias');
  }

  createCategoria(categoriaForm: any) {
    return this.http.post(this.API_URL+'categorias', categoriaForm);
  }
  updateCategoria(id: string, categoriaForm: any) {
    return this.http.put(this.API_URL+'categorias/'+id, categoriaForm);
  }
  deleteCategoria(id: string) {
    return this.http.delete(this.API_URL+'categorias/'+id);
  }

  // SOLICITUD EMPLEO

  getSolicitudEmpleo(): Observable<any> {
    return this.http.get(this.API_URL+'solicitudes-empleo');
  }
  getSolicitudEmpleoDetail(id: string): Observable<any> {
    return this.http.get(this.API_URL+'solicitudes-empleo/'+id);
  }
  getCV(id: string) {
    return this.http.get(this.API_URL+'solicitudes-empleo/'+ id + '/cv', {
      responseType: 'blob'
    })
  }

  postSolicitudEmpleo(solicitudEmpleo: FormData) {
    return this.http.post(this.API_URL+'solicitudes-empleo', solicitudEmpleo);
  }

  deleteSolicitudEmpleo(id: string) {
    return this.http.delete(this.API_URL+'solicitudes-empleo/'+id);
  }

  // CONSULTAS

  getConsultas(): Observable<any> {
    return this.http.get(this.API_URL+'consultas-contacto');
  }
  getConsulta(id: string) {
    return this.http.get(this.API_URL+'consultas-contacto/'+id);
  }
  postConsulta(consulta: FormData) {
    return this.http.post(this.API_URL+'consultas-contacto', consulta);
  }
  deleteConsulta(id: string) {
    return this.http.delete(this.API_URL+'consultas-contacto/'+id);
  }

  // PEDIDOS

  getPedido(usuarioID: string): Observable<any> {
    return this.http.get(this.API_URL+'pedidos/'+usuarioID, {headers: this.headers});
  }
  getPedidosDetalles(usuarioID: string): Observable<InterfacePedidoDetalles[]> {
    const url = `${this.API_URL}pedidos/detalles-usuario?usuario_id=${usuarioID}`;
    return this.http.get<InterfacePedidoDetalles[]>(url, { headers: this.headers });
  }
  createPedido(pedidoData: {usuario_id: string, fecha_pedido: string, estado: string, total: number}): Observable<any> {
    return this.http.post(this.API_URL + 'pedidos', pedidoData, {headers: this.headers});
  }

  // DETALLE PEDIDOS

  postDetallePedidos(pedido: any) {
    return this.http.post(this.API_URL+'detalle-pedidos', pedido);
  }

}
