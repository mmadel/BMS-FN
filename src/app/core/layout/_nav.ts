import { INavData } from '@coreui/angular-pro';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Patient',
    url: '/base',
    iconComponent: { name: 'cil-disabled' },
    children: [
      {
        name: 'Patient List',
        url: '/base/accordion'
      },
      {
        name: 'Patient Profile',
        url: '/base/accordion'
      },
      {
        name: 'Patient Session',
        url: '/base/accordion'
      },
    ]
  },
  {
    name: 'Providers',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Provider List',
        url: '/base/accordion'
      },
      {
        name: 'Referring Provider List',
        url: '/base/accordion'
      }
    ]
  },
  {
    name: 'Insurance',
    url: '/base',
    iconComponent: { name: 'cil-library-building' },
    children: [
      {
        name: 'Insurance List',
        url: '/base/accordion'
      }
    ]
  },
  {
    name: 'Invoicing',
    url: '/base',
    iconComponent: { name: 'cil-money' },
    children: [
      {
        name: 'Invoicing Area',
        url: '/base/accordion'
      }
    ]
  },
  {
    name: 'Posting',
    url: '/base',
    iconComponent: { name: 'cil-send' },
    children: [
      {
        name: 'Batch Insurance Payment',
        url: '/base/accordion'
      },
      {
        name: 'ERA',
        url: '/base/accordion'
      }
    ]
  },
];
