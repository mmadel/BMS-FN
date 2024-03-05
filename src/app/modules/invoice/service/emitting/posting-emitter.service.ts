import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostingFilterModel } from 'src/app/modules/post/bip/filter/posting.filter.model';

@Injectable({
  providedIn: 'root'
})
export class PostingEmitterService {
  public searchPostingClient$: BehaviorSubject<PostingFilterModel | null> = new BehaviorSubject<PostingFilterModel | null>(null);
  constructor() { }
}
