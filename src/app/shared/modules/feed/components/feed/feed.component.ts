import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import {Store, select} from '@ngrx/store'
import {getFeedAction} from 'src/app/shared/modules/feed/store/actions/getFeed.action'
import {Observable, Subscription} from 'rxjs'
import {GetFeedResponseInterface} from 'src/app/shared/modules/feed/types/getFeedResponse.interface'
import {
  feedSelector,
  errorSelector,
  isLoadingSelector,
} from 'src/app/shared/modules/feed/store/selectors'
import {environment} from 'src/environments/environment'
import {Router, ActivatedRoute, Params} from '@angular/router'
import {parseUrl} from 'node_modules/query-string/base'
import {stringify} from 'node_modules/query-string/base'

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {
  @Input('apiUrl') apiUrlProps: string

  feed$: Observable<GetFeedResponseInterface | null>
  error$: Observable<string | null>
  isLoading$: Observable<boolean>
  limit = environment.limit
  baseUrl: string
  queryParamsSubscription: Subscription
  currentPage: number

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.baseUrl = this.router.url.split('?')[0]
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isApiUrlChanged =
      !changes['apiUrlProps'].firstChange &&
      changes['apiUrlProps'].currentValue !== changes['apiUrlProps'].previousValue
      if(isApiUrlChanged){
        this.fetchFeed()
      }
    }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number((params as any).page || '1')
        this.fetchFeed()
      },
    )
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = parseUrl(this.apiUrlProps)
    const stringifiedParams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(getFeedAction({url: apiUrlWithParams}))
  }
}
