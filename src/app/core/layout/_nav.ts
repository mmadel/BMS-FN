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
      }
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
    url: '/insurance',
    iconComponent: { name: 'cil-library-building' },
    children: [
      {
        name: 'Insurance List',
        url: '/insurance/list'
      }
    ]
  },
  {
    name: 'Invoicing',
    url: '/invoice',
    iconComponent: { name: 'cil-money' },
    children: [
      {
        name: 'Invoicing Area',
        url: '/invoice/client/list'
      }
    ]
  },
  {
    name : 'CMS Filing',
    url: '/cms/filing',
    iconComponent: { name: 'cilHistory' },
  },

  {
    name: 'Posting',
    url: '/posting',
    iconComponent: { name: 'cil-send' },
    children: [
      {
        name: 'Batch Insurance Payment',
        url: '/posting/bip'
      },
      {
        name: 'ERA',
        url: '/posting/era'
      }
    ]
  },
  {
    name: 'Tools',
    url: '/tools',
    iconComponent: { name: 'cilAppsSettings' },
    children: [
      {
        name: 'Fee Schedule',
        url: '/tools/fee-schedule'
      },
      {
        name: 'Cancel Claims',
        url: '/tools/cancel-claims'
      },
      {
        name: 'Modifier Rules',
        url: '/tools/modifier-rules'
      }
    ]
  },
  {
    name: 'Admin Tools',
    url: '/admin/tools',
    iconComponent: { name: 'cibSuperuser' },
    children:[
      {
        name: 'Group Information',
        url: '/admin/tools/group'
      },
      {
        name: 'Insurances Mapping',
        url: '/admin/tools/insurance/company/mapping'
      },
      {
        name: 'Session Defaults',
        url: ''
      },
      {
        name: 'Account Management',
        url: ''
      }
    ]
  }
];
