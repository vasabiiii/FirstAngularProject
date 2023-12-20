import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CreateArticleComponent} from 'src/app/createArticle/components/createArticle/createArticle.component'
import {RouterModule} from '@angular/router'
import {ArticleFormModule} from 'src/app/shared/modules/articleForm/articleForm.module'
import {CreateArticleService} from 'src/app/createArticle/services/createArticle.service'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'
import {reducers} from 'src/app/editArticle/store/reducers'
import {EditArticleComponent} from './components/editArticle/editArticle.component'
import {UpdateArticleEffect} from './store/effects/updateArticle.effect'
import {GetArticleEffect} from './store/effects/getArticle.effect'
import {EditArticleService} from 'src/app/editArticle/services/editArticle.service'
import {ArticleService as SharedArticleService} from 'src/app/shared/services/article.service'

const routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers)
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService]
})
export class EditArticleModule {}
