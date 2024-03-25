import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { InvoiceService } from 'src/app/modules/invoice/service/invoice.service';
import { SessionHistory } from '../../model/session.history';

@Component({
  selector: 'session-history-item',
  templateUrl: './session-history-item.component.html',
  styleUrls: ['./session-history-item.component.scss']
})
export class SessionHistoryItemComponent implements OnInit {
  @Input() item: SessionHistory;
  showActionVisibility: boolean = false
  showCorrectClaimActionVisibility: boolean = false;
  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
  }
  toggleActionsModal() {
    this.showActionVisibility = !this.showActionVisibility
  }
  openSession(sessionId: number) {
    console.log(sessionId)
  }
  changeVisibility(event: any) {
    this.showActionVisibility = false
    if (event === 'correct_claim')
      this.showCorrectClaimActionVisibility = true;
  }
  close(action: string) {
    if (action === 'correct_claim') {
      this.showCorrectClaimActionVisibility = false;
    }
  }
  changeCorrectClaimActionVisibility(event: any) {
    if (event === 'close')
      this.showCorrectClaimActionVisibility = false;
  }
  downloadCMS() {
    this.invoiceService.downloadCMS(this.item.submissionId).subscribe(result => {
      this.constructExportedFile(result,'cms-','pdf')
    }, error => {
      console.log('Error during downloading CMS document');
    })
  }
  constructExportedFile(response: any, fileName: string, extention: string) {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(response)
    a.href = objectUrl
    var nameDatePart = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    a.download = fileName + nameDatePart + '.' + extention;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }
}

