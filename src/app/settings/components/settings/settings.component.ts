import {Component, OnInit, OnDestroy} from '@angular/core'
import {FormGroup, FormBuilder} from '@angular/forms'
import {Store, select} from '@ngrx/store'
import {currentUserSelector} from 'src/app/auth/store/selectors'
import {filter} from 'rxjs/operators'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {Subscription, Observer, Observable} from 'rxjs'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'
import {
  isSubmittingSelector,
  validationErrorsSelector
} from '../../store/selectors'
import {CurrentUserInputInterface} from 'src/app/shared/types/currentUserInput.interface'
import {updateCurrentUserAction} from 'src/app/auth/store/actions/updateCurrentUser.action'
import {logoutAction} from 'src/app/auth/store/actions/sync.action'

@Component({
  selector: 'mc-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  form: FormGroup
  currentUser: CurrentUserInterface
  currentUserSubscription: Subscription
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }
  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser
        this.initializeForm()
      })
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: ''
    })
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value
    }
    this.store.dispatch(updateCurrentUserAction({currentUserInput}))
  }

  logout(): void {
    this.store.dispatch(logoutAction())
  }
}
