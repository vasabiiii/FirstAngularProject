import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {ArticleFormComponent} from './components/articleForm/articleForm.component'
import {BackendErrorMessagesModule} from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module'
import {ReactiveFormsModule} from '@angular/forms'

@NgModule({
  imports: [CommonModule, BackendErrorMessagesModule, ReactiveFormsModule],
  declarations: [ArticleFormComponent],
  exports: [ArticleFormComponent]
})
export class ArticleFormModule {}
