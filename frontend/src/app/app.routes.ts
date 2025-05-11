import { Routes } from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component';
import {ContactoComponent} from './components/contacto/contacto.component';
import {NuestrasTiendasComponent} from './components/nuestras-tiendas/nuestras-tiendas.component';
import {QuienesSomosComponent} from './components/quienes-somos/quienes-somos.component';
import {TrabajaConNosotrosComponent} from './components/trabaja-con-nosotros/trabaja-con-nosotros.component';
import {LoginComponent} from './components/login/login.component';
import {CartComponent} from './components/cart/cart.component';
import {UserListComponent} from './components/backend/user-list/user-list.component';
import {AddProductComponent} from './components/backend/add-product/add-product.component';
import {SolicitudEmpleoComponent} from './components/backend/solicitud-empleo/solicitud-empleo.component';
import {
  SolicitudEmpleoDetailComponent
} from './components/backend/solicitud-empleo/solicitud-empleo-detail/solicitud-empleo-detail.component';
import {CategoriasComponent} from './components/backend/categorias/categorias.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'contact',
    component: ContactoComponent
  },
  {
    path: 'nuestros-obradores',
    component: NuestrasTiendasComponent
  },
  {
    path: 'quienes-somos',
    component: QuienesSomosComponent
  },
  {
    path: 'trabaja-nosotros',
    component: TrabajaConNosotrosComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'userList',
    component: UserListComponent
  },
  {
    path: 'addProduct',
    component: AddProductComponent
  },
  {
    path: 'solicitudesEmpleo',
    component: SolicitudEmpleoComponent
  },
  {
    path: 'solicitudesEmpleo/solicitudDetail/:id',
    component: SolicitudEmpleoDetailComponent
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  }
];
