import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SimpleEditorComponent } from './simple-editor/simple-editor.component';


@NgModule({
  declarations: [
    SidemenuComponent, 
    SimpleEditorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidemenuComponent, 
    SimpleEditorComponent
  ]
})
export class SharedModule { }
