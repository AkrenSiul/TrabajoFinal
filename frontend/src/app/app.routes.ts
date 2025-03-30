import { Routes } from '@angular/router';
import {InicioComponent} from './components/inicio/inicio.component';
import {ContactoComponent} from './components/contacto/contacto.component';
import {NuestrasTiendasComponent} from './components/nuestras-tiendas/nuestras-tiendas.component';
import {QuienesSomosComponent} from './components/quienes-somos/quienes-somos.component';
import {TrabajaConNosotrosComponent} from './components/trabaja-con-nosotros/trabaja-con-nosotros.component';

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
    path: 'nuestras-tiendas',
    component: NuestrasTiendasComponent
  },
  {
    path: 'quienes-somos',
    component: QuienesSomosComponent
  },
  {
    path: 'trabaja-nosotros',
    component: TrabajaConNosotrosComponent
  }
];
