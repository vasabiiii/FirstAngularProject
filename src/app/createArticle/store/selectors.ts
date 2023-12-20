import {createFeatureSelector, createSelector} from '@ngrx/store'
import {CreateArticleStateInterface} from 'src/app/createArticle/types/createArticleState.interface'
import {AppStateInterface} from 'src/app/shared/types/appState.interface'

export const createArticleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  CreateArticleStateInterface
>('createArticle')

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.validationErrors
)
