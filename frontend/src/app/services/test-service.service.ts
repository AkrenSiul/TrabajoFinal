import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FakeProducstInterface} from '../common/fake-producst-interface';
import {AgentInterfaceTest} from '../common/agent-interface-test';
import {InterfaceProductos} from '../common/productos';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
  private readonly http: HttpClient = inject(HttpClient);
  urlFakeProduct = 'https://fakestoreapi.com/products';
  urlAgents = 'https://valorant-api.com/v1/agents';
  private API_URL = 'http://localhost:8000/api/'
  private headers = new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  );

  constructor() { }

  getProducts(): Observable<any>{
    return this.http.get(this.urlFakeProduct);
  }

  getAgents(): Observable<AgentInterfaceTest> {
    return this.http.get<AgentInterfaceTest>(this.urlAgents);
  }

  getTest(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/test')
  }

  postLogin(usuario: string, contrasenya: string): Observable<any> {
    return this.http.post(this.API_URL+'login', {usuario, contrasenya}, {headers: this.headers});
  }
  postRegistro(): Observable<any> {
    return this.http.post(this.API_URL+'registro', {headers: this.headers})
  }

  logOut(): Observable<any> {
    return this.http.get(this.API_URL+'logout', {headers: this.headers})
  }

  getProduct(): Observable<InterfaceProductos[]> {
    return this.http.get<InterfaceProductos[]>(this.API_URL+'producto', {headers: this.headers});
  }
}
