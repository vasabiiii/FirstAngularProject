import { Component, Input, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { isLoggedInSelector } from "src/app/auth/store/selectors";

@Component({
    selector: 'mc-feed-toggler',
    templateUrl: './feedToggler.component.html',
    styleUrls:['./feedToggler.component.scss']
})

export class FeedTogglerComponent implements OnInit{
    @Input('tagName') tagNameProps: string

    isLoggedIn$: Observable<boolean>

    constructor(private store: Store){}

    ngOnInit(): void {
        this.initalizeValues()
    }

    initalizeValues() :void{
        this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    }

}