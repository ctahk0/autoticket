import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { InsertComponent } from './pravila/insert/insert.component';

const routes: Routes = [
    { path: 'dodajpravilo', component: InsertComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [InsertComponent];
