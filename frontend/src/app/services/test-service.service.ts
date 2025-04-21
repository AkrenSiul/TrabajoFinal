import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FakeProducstInterface} from '../common/fake-producst-interface';
import {AgentInterfaceTest} from '../common/agent-interface-test';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {
  private readonly http: HttpClient = inject(HttpClient);
  urlFakeProduct = 'https://fakestoreapi.com/products';
  urlAgents = 'https://valorant-api.com/v1/agents';
  private API_URL = 'http://localhost:8080/api/'

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
    const   headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.API_URL+'login', {usuario, contrasenya}, {headers});
  }
}
