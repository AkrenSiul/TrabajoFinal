import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FakeProducstInterface} from '../common/fake-producst-interface';
import {AgentInterfaceTest} from '../common/agent-interface-test';
import {InterfaceProductos} from '../common/productos';

@Injectable({
  providedIn: 'root'
})
export class ApiPanaderiaService {
  private readonly http: HttpClient = inject(HttpClient);
  urlAgents = 'https://valorant-api.com/v1/agents';
  private API_URL = 'http://localhost:8000/api/'
  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  );

  constructor() { }


  getTest(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/test')
  }

  // USUARIOS

  postLogin(usuario: string, contrasenya: string): Observable<any> {
    return this.http.post(this.API_URL+'login', {usuario, contrasenya}, {headers: this.headers});
  }
  postRegistro(usuario: string, contrasenya: string, email: string): Observable<any> {
    return this.http.post(this.API_URL+'registro', {usuario, contrasenya, email}, {headers: this.headers})
  }
  logOut(): Observable<any> {
    return this.http.get(this.API_URL+'logout', {headers: this.headers})
  }
  getUsuarios(): Observable<any> {
    return this.http.get(this.API_URL+'usuarios', {headers: this.headers})
  }
  getUsuario(): Observable<any> {
    return this.http.get(this.API_URL+'usuario', {headers: this.headers});
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

  // GET CATEGORIAS

  getCategorias() {
    return this.http.get(this.API_URL+'producto/categoria');
  }


}
