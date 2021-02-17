import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },
  {
    path: 'friends/:to',
    loadChildren: () => import('../friends/friends.module').then( m => m.FriendsPageModule )
  },
  {
    path: 'searchuser/:to',
    loadChildren: () => import('../searchuser/searchuser.module').then( m => m.SearchuserPageModule )
  },
  {
    path: 'user',
    loadChildren: () => import('../user/user.module').then( m => m.UserPageModule )
  },
  {
    path: 'userinfo/:uname/:from',
    loadChildren: () => import('../user/user.module').then( m => m.UserPageModule )
  },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule )
  },
  {
    path: 'sendvaliss/:uname',
    loadChildren: () => import('../sendvaliss/sendvaliss.module').then( m => m.SendvalissPageModule)
  },
  {
    path: 'requestvaliss',
    loadChildren: () => import('../requestvaliss/requestvaliss.module').then( m => m.RequestvalissPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
