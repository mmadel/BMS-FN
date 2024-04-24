export class ServiceLinesTableColumns {
    static readonly columns = [
        {
            key: 'dos_str',
            label: 'Date Of Service',
            _style: { width: '10%' },
        },
        {
            key: 'provider',
            label: 'Provider',
            _style: { width: '10%' },
        },
        // {
        //     key: 'place',
        //     _style: { width: '5%' },
        // },
        {
            key: 'cpt',
            label: 'Service Code',
            _style: { width: '20%' },
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