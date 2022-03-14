import { Routes } from "@angular/router";
import { AuthGuard } from "../service/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ScreenContentComponent } from "./screen-content/screen-content.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { WelcomeScreenComponent } from "./welcome-screen/welcome-screen.component";

export const ADMIN_ROUTING: Routes=[

    {path:'', redirectTo:'dashboard',pathMatch:'full'},
    // {path:'',loadChildren: ()=> import('./../shared/routes/full-layout.routes').then(m=>m.Full_ROUTES),canActivate:[AuthGuard]},
    {path:'dashboard',component:DashboardComponent},
    {path:'user-management',component:UserManagementComponent},
    {path:'user-profile',component:UserDetailsComponent},
    {path:'welcome-screen',component:WelcomeScreenComponent},
    {path:'screen-content',component:ScreenContentComponent}
]