
export class PDF{
   
    hoja: PropertiesPDF;


    constructor(title: string){
        this.hoja = new PropertiesPDF();

        this.hoja.content =  [{
            'image': 'data:image/png;base64,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\u003d\u003d',
            'width': 200,
            'absolutePosition': {
                'x': 50,
                'y': 20
            }
        },
        {
            'layout': 'noBorders',
            'table': {
                'widths': [
                    10
                ],
                'heights': [
                    300
                ],
                'body': [
                    [
                        {
                            'text': '',
                            'fillColor': '#1D80C0'
                        }
                    ]
                ]
            },
            'absolutePosition': {
                'x': 10,
                'y': 0
            }
        },
        {
            'layout': 'noBorders',
            'table': {
                'widths': [
                    10
                ],
                'heights': [
                    600
                ],
                'body': [
                    [
                        {
                            'text': '',
                            'fillColor': '#FFBB00'
                        }
                    ]
                ]
            },
            'absolutePosition': {
                'x': 575,
                'y': 300
            }
        },
        {
            'layout': 'noBorders',
            'table': {
                'widths': [
                    150
                ],
                'heights': [
                    7
                ],
                'body': [
                    [
                        {
                            'text': '',
                            'fillColor': '#DF2E3D'
                        }
                    ]
                ]
            },
            'absolutePosition': {
                'x': 450,
                'y': 820
            }
        },
        {
            'text': '{{P_DATE_GENERATED_DOC}}',
            'alignment': 'right',
            style: 'tableHeader',
        },
        {
            'text': 'SODIMAC CORONA',
            'alignment': 'right',
            style: 'tableHeader',
        },
        {
            'text': 'NIT: 800.242.106-2',
            'alignment': 'right',
            style: 'tableHeader',
        },
        {
            'text': 'Original',
            'alignment': 'right',
            style: 'tableHeader',
        },
        {
            'text': title,
            'alignment': 'center',
            'margin': [
                0,
                20,
                0,
                0
            ],
            style: 'tableHeader'
        }];

        this.hoja.styles = {
            'tableHeader': {
                'bold': true,
                'fontSize': 10
            },
            'columnSelected': {
                'bold': true,
                'fontSize': 10,
                'background': '#0071ce',
                'color': 'white'
            },
            'detalleSimulacion': {
                'bold': false,
                'fontSize': 10
            },
            'tableHeaderCenter': {
                'bold': true,
                'fontSize': 10,
                'alignment': 'center'
            },
            'tableHeaderCenterTotal': {
                'bold': true,
                'fontSize': 10,
                'alignment': 'center',
                'marginTop': 4
            },
            'tableCell': {
                'fontSize': 10,
                'margin': [
                    0,
                    8,
                    0,
                    0
                ]
            },
            'tableCellCenter': {
                'fontSize': 10,
                'alignment': 'center',
                'margin': [
                    0,
                    8,
                    0,
                    0
                ]
            }
        }
    }
}


export class PropertiesPDF{
    content: any;
    styles: any;
}