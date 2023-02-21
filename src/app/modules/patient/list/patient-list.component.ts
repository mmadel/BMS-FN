import { Component, OnInit } from '@angular/core';
import usersData from './_data';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  constructor() { }
  roles = [...new Set(usersData.map(item => item.role))];
  selected: string[] = ['Staff', 'Admin'];
  ngOnInit(): void {
  }
  usersData = usersData;
  

  columns = [
    {
      key: 'name',
      _style: { width: '40%' }
    },
    'registered',
    { key: 'role', _style: { width: '20%' } },
    { key: 'status', _style: { width: '15%' } },
    {
      key: 'show',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false
    }
  ];
  set columnFilterValue(value) {
    this._columnFilterValue = { ...value };
    if (!Object.entries(value).length) {
      this.selected = [];
    }
  }

  get columnFilterValue() {
    return this._columnFilterValue;
  }

  private _columnFilterValue: any = {};
  handleValueChange($event: any) {
    const columnFilterValue = { ...this.columnFilterValue };
    if ($event?.length) {
      const selected = [...$event];
      this.selected = selected;
      const filterFunction = (item: any) => selected.includes(item);
      this.columnFilterValue = { ...columnFilterValue, role: filterFunction };
      return;
    }
    delete columnFilterValue.role;
    this.columnFilterValue = { ...columnFilterValue };
  }
  getBadge(status: string) {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'secondary';
      case 'Pending':
        return 'warning';
      case 'Banned':
        return 'danger';
      default:
        return 'primary';
    }
  }

  details_visible = Object.create({});

  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }

}
