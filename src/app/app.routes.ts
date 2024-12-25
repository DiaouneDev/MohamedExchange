import { Routes } from '@angular/router';
import { DeviseConversionComponent } from '../components/conversions/devise-conversion/devise-conversion.component';
import { HistoriqueConversionsComponent } from '../components/historiques/historique-conversion/historique-conversion.component';
import { DetailConversionComponent } from '../components/details/detail-conversion/detail-conversion.component';

export const routes: Routes = [
  { path: '', redirectTo: '/convertir', pathMatch: 'full' }, // Route par défaut
  { path: 'convertir', component: DeviseConversionComponent },
  { path: 'historique', component: HistoriqueConversionsComponent },
  { path: 'detail/:id', component: DetailConversionComponent }
];
