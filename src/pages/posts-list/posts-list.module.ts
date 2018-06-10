import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostsListPage } from './posts-list';

@NgModule({
  declarations: [
    PostsListPage,
  ],
  imports: [
    IonicPageModule.forChild(PostsListPage),
  ],
})
export class PostsListPageModule {}
