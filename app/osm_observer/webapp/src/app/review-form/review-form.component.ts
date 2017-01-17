import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import {TranslateService} from 'ng2-translate';

import { Review, ReviewStatus } from '../types/review';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.sass']
})
export class ReviewFormComponent implements OnInit, OnChanges {
  @Input() id: number;
  reviewOKComment: string;

  model = new Review();
  reviewStatus = ReviewStatus;

  constructor(private reviewService: ReviewService, private translate: TranslateService) { }

  reviewOK() {
    this.reviewService.addReview(this.id, new Review(undefined, undefined, ReviewStatus.OK, this.reviewOKComment));
  }

  onSubmit() {
    this.reviewService.addReview(this.id, this.model)
                      .then(v => {
                        this.model = new Review();
                      })
                      .catch(error => {});
    return false;
  };

  ngOnChanges(changes: SimpleChanges) {
    this.id = changes['id'].currentValue;
  }

  ngOnInit() {
    this.translate.get('OK').subscribe((res: string) => {
      this.reviewOKComment = res
    });
  }
}
