import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterfaceProductos} from '../common/productos';
import {InterfacePedidoDetalles} from '../common/pedido-detalles';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiPanaderiaService {
  private readonly http: HttpClient = inject(HttpClient);
  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  );
  // USUARIOS

  postLogin(usuario: string, contrasenya: string): Observable<any> {
    return this.http.post(environment.server.panaderia+'login', {usuario, contrasenya}, {headers: this.headers});
  }
  postRegistro(formData: any): Observable<any> {
    return this.http.post(environment.server.panaderia+'registro', formData, {headers: this.headers})
  }
  logOut(): Observable<any> {
    return this.http.get(environment.server.panaderia+'logout', {headers: this.headers})
  }
  getUsuarios(): Observable<any> {
    return this.http.get(environment.server.panaderia+'usuarios', {headers: this.headers})
  }
  deleteUsuarios(id: string): Observable<any> {
    return this.http.delete(environment.server.panaderia+'usuario/delete/'+id, {headers: this.headers});
  }
  patchUsuario(id: string, usuarioModificado: any): Observable<any> {
    return this.http.patch(environment.server.panaderia+'/usuario/update/'+id, usuarioModificado, {headers: this.headers});
  }

  // PRODUCTOS

  getProducts(url: string): Observable<InterfaceProductos[]> {
    return this.http.get<InterfaceProductos[]>(url, {headers: this.headers});
  }
  getProduct(id: string): Observable<any> {
    return this.http.get<any>(environment.server.panaderia+'producto/'+id, {headers: this.headers});
  }
  createProduct(producto: FormData) {
    return this.http.post(environment.server.panaderia+'producto/crearProducto', producto);
  }
  updateProduct(id: string, productoUpdate: FormData) {
    return this.http.post(environment.server.panaderia+'producto/update/'+id, productoUpdate);
  }
  deleteProduct(id: string)  {
    return this.http.delete(environment.server.panaderia+'producto/deleteProducto/'+id);
  }

  // CATEGORIAS

  getCategorias() {
    return this.http.get(environment.server.panaderia+'producto/categoria');
  }


  getCategoriaAll(): Observable<any> {
    return this.http.get(environment.server.panaderia+'categorias');
  }

  createCategoria(categoriaForm: any) {
    return this.http.post(environment.server.panaderia+'categorias', categoriaForm);
  }
  updateCategoria(id: string, categoriaForm: any) {
    return this.http.put(environment.server.panaderia+'categorias/'+id, categoriaForm);
  }
  deleteCategoria(id: string) {
    return this.http.delete(environment.server.panaderia+'categorias/'+id);
  }

  // SOLICITUD EMPLEO

  getSolicitudEmpleo(): Observable<any> {
    return this.http.get(environment.server.panaderia+'solicitudes-empleo');
  }
  getSolicitudEmpleoDetail(id: string): Observable<any> {
    return this.http.get(environment.server.panaderia+'solicitudes-empleo/'+id);
  }
  getCV(id: string) {
    return this.http.get(environment.server.panaderia+'solicitudes-empleo/'+ id + '/cv', {
      responseType: 'blob'
    })
  }

  postSolicitudEmpleo(solicitudEmpleo: FormData) {
    return this.http.post(environment.server.panaderia+'solicitudes-empleo', solicitudEmpleo);
  }

  deleteSolicitudEmpleo(id: string) {
    return this.http.delete(environment.server.panaderia+'solicitudes-empleo/'+id);
  }

  // CONSULTAS

  getConsultas(): Observable<any> {
    return this.http.get(environment.server.panaderia+'consultas-contacto');
  }
  getConsulta(id: string) {
    return this.http.get(environment.server.panaderia+'consultas-contacto/'+id);
  }
  postConsulta(consulta: FormData) {
    return this.http.post(environment.server.panaderia+'consultas-contacto', consulta);
  }
  deleteConsulta(id: string) {
    return this.http.delete(environment.server.panaderia+'consultas-contacto/'+id);
  }

  // PEDIDOS

  getPedidos(): Observable<any> {
    return this.http.get(environment.server.panaderia+'pedidos', {headers: this.headers})
  }

  getPedido(usuarioID: string): Observable<any> {
    return this.http.get(environment.server.panaderia+'pedidos/'+usuarioID, {headers: this.headers});
  }
  getPedidosDetalles(usuarioID: string): Observable<InterfacePedidoDetalles[]> {
    const url = `${environment.server.panaderia}pedidos/detalles-usuario?usuario_id=${usuarioID}`;
    return this.http.get<InterfacePedidoDetalles[]>(url, { headers: this.headers });
  }
  createPedido(pedidoData: {usuario_id: string, fecha_pedido: string, estado: string, total: number}): Observable<any> {
    return this.http.post(environment.server.panaderia + 'pedidos', pedidoData, {headers: this.headers});
  }

  updatePedido(id: string, data: any) {
    return this.http.put(environment.server.panaderia + 'pedidos/' + id, data, {headers: this.headers});
  }

  deletePedido(id: string) {
    return this.http.delete(environment.server.panaderia + 'pedidos/' + id, {headers: this.headers});
  }

  // DETALLE PEDIDOS

  postDetallePedidos(pedido: any) {
    return this.http.post(environment.server.panaderia+'detalle-pedidos', pedido);
  }

}
