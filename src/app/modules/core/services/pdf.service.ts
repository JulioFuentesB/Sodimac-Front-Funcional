import { Injectable } from '@angular/core';
import { PDF } from '../models/pdf.model';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;   

@Injectable({
    providedIn: 'root'
})
export class PDFService {

    template:any;

    constructor(){

    }

    generarTemplatePDF(title: string){
        return new PDF(title);
    }

    generarPDF(template: PDF){        
        let contentPdf = JSON.parse(JSON.stringify(template.hoja).slice());
        const pdf = pdfMake.createPdf(contentPdf);
        pdf.open();
    }
}