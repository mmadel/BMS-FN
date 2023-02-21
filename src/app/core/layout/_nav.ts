import { INavData } from '@coreui/angular-pro';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Patient',
    url: '/patient',
    iconComponent: { name: 'cil-disabled' },
    children: [
      {
        name: 'Patient List',
        url: '/patient/list'
      },
      {
        name: 'Patient Profile',
        url: '/patient/profile'
      },
      {
        name: 'Patient Session',
        url: '/patient/session'
      },
    ]
  },
  {
    name: 'Providers',
    url: '/provider',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Provider List',
        url: '/provider/providerlist'
      },
      {
        name: 'Referring Provider List',
        url: '/provider/referringproviders'
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
