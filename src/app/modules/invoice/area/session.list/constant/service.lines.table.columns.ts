export class ServiceLinesTableColumns {
    static readonly columns = [
        {
            key: 'dos_str',
            label: 'Date Of Service'
        },
        'provider',
        {
            key: 'caseTitle',
            label: 'Case'
        },
        {
            key: 'place',
            _style: { width: '5%' },
        },
        {
            key: 'cpt',
            _style: { width: '8%' },
        },
        {
            key: 'unit',
            _style: { width: '5%' },
        },
        {
            key: 'charge',
            _style: { width: '8%' },
        },
        {
            key: 'correct',
            label: 'Correct',
        },
        {
            key: 'actions',
            label: 'Actions',
            filter: false,
            sorter: false
        }
    ];
}