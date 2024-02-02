import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "./storage.service";
import { environment } from "src/environments/environment";
import { Helper } from "../utils/helper";

@Injectable({
    providedIn: "root",
})
export class DataService {
    constructor(
        private http: HttpClient,
        private storageService: StorageService
    ) { }

    // Header por Json de Configuración
    protected headersByConfiguration(): HttpHeaders {
        return new HttpHeaders({
            "Content-type": "application/json",
            "Ocp-Apim-Subscription-Key": this.variableConfiguracion("subscriptionKey"),
        });
    }

    // Headers Internet
    protected generateBasicHeadersInternet(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': environment.internet.SUBSCRIPTIONKEY,
            Authorization: 'Bearer ' + sessionStorage.getItem('token')
        });
    }

    // Headers Intranet
    protected generateBasicHeadersIntranet(): HttpHeaders {
        return new HttpHeaders({
          "Content-Type": "application/json"
        });
    }

    //Post Internet sin encriptar por JSON
    postGenericByConfigurationInternet(attribute: string, data: any, urlService: string): Observable<any> {
        return this.http.post(
            this.variableConfiguracion(attribute) + urlService, data, {
            headers: this.generateBasicHeadersInternet(),
        });
    }

    //Post Internet encriptado por JSON
    postGenericEncryptByConfigurationInternet(attribute: string, data: any, urlService: string): Observable<any> {
        let bodyParametros = {
            "Parametros": Helper.encrypt(JSON.stringify(data))
        }
        return this.http.post(
            this.variableConfiguracion(attribute) + urlService, bodyParametros, {
            headers: this.generateBasicHeadersInternet(),
        });
    }

    //Post Encriptado Internet
    postGenericoServiceInternet(data: any, urlService: any): Observable<any> {
        let bodyParametros = {
            "Parametros": Helper.encrypt(JSON.stringify(data))
        }
        return this.http.post(environment.internet.api + urlService, bodyParametros, {
            headers: this.generateBasicHeadersInternet()
        })
    }

    //Post Internet por Environment
    postGenericoEnvironmentInternet(environment: string, urlService: string, data: any) {
        return this.http.post(environment + urlService, data, {
            headers: this.generateBasicHeadersInternet()
        });
    }

    //Get Generico Internet
    getGenericServiceInternet(environment: string, urlService: string) {
        return this.http.get(environment + urlService, {
            headers: this.generateBasicHeadersInternet()
        });
    }

    // Post Generico Intranet
    postGenericoService(data: any, urlService: any): Observable<any> {
        return this.http.post(environment.intranet.api + urlService, data ,{
          headers: this.generateBasicHeadersIntranet()
        })
    }

    // Get Generico Intranet
    getGenericServiceIntranet(urlService: string) {
        return this.http.get(environment.intranet.api + urlService, {
            headers: this.generateBasicHeadersIntranet()
        });
    }

    // Servicio para autenticar usuario internet
    autheticated() {
        return this.http.get(environment.internet.autheticated, {
            headers: this.generateBasicHeadersInternet(),
        });
    }

    // Obtiene el valor almacenado del json
    variableConfiguracion(key: string) {
        const conf = this.storageService.json;
        return conf[key];
    }

    // Post Generico Intranet Custom Api
    postGenericoIntranetCustomApi<T>(urlService: string, data: any): Observable<T> {
        return this.http.post<T>(urlService, data, { headers: this.generateBasicHeadersIntranet()});
    }

    // Get Generico Intranet Custom Api
    getGenericoIntranetCustomApi<T>(urlService: string, params?: HttpParams): Observable<T> {
        if (params) return this.http.get<T>(urlService, { headers: this.generateBasicHeadersIntranet(), params: params});
        return this.http.get<T>(urlService, { headers: this.generateBasicHeadersIntranet()});
    }

    // Put Generico Intranet Custom Api
    putGenericoIntranetCustomApi<T>(urlService: string, data: any): Observable<T> {
        return this.http.put<T>(urlService, data, { headers: this.generateBasicHeadersIntranet()});
    }
}
