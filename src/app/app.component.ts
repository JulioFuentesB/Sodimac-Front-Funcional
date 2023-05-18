import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { DataService } from './modules/core/services/data.service';
import { HeaderObj, PageService } from './modules/core/services/page.service';
import { StorageService } from './modules/core/services/storage.service';
import { Helper } from './modules/core/utils/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showMsj = false;
  showContent = false;
  message = 'No cuenta con privilegios';
  environmentName: string;
  versionNumber: string;
  maxTimeToShowMessage = 2000;

  isInternet = true;
  hasJson = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public storageService: StorageService,
    private spinner: NgxSpinnerService,
    public pageService: PageService,
    private router: Router,
    private dataService: DataService
  ) {
    this.pageService.setHeaderPage(new HeaderObj('<PAGE_NAME>'));
    this.environmentName = environment.environmentName;
    this.versionNumber = environment.version;
  }

  ngOnInit(): void {

    this.spinner.show();
    if(this.isInternet){
      this.getQueryParamsInternet();
    } else {
      this.getQueryParamsIntranet();
    }
    setTimeout(() => {
      this.showMsj = true;
      if (!(this.showContent && this.showMsj)) {
        this.spinner.hide();
      }
    }, this.maxTimeToShowMessage);
  }

  getQueryParamsInternet(): void {
    let params = this.splitParams();
    if (params[""] == "undefined") {
      this.showContent = false;
      this.message = "Usted no tiene privilegios";
      this.showMsj = true;
    } else {
      const y = Helper.decrypt(params.token.toString());
      if (
        !y.split(";")[1] ||
        !y.split(";")[2] ||
        !y.split(";")[3]
      ) {
        this.showContent = false;
        this.message = "Datos de inicio de sesión incorrectos.";
        this.showMsj = true;
      } else {
        sessionStorage.setItem("usr", y.split(";")[1]);
        sessionStorage.setItem("key", y.split(";")[2]);
        sessionStorage.setItem("token", y.split(";")[3]);
        sessionStorage.setItem("version", this.versionNumber.toString());
        this.validateToken();
      }
    }
  }

  splitParams(): any {
    let queryParams: any = {};
    let anchor = document.createElement('a');
    anchor.href = window.location.href;
    let queryStrings = anchor.search.substring(1);
    let params = queryStrings.split('&');
    for (var i = 0; i < params.length; i++) {
      var pair = params[i].split('=');
      queryParams[pair[0]] = decodeURIComponent(pair[1]);
    }
    return queryParams;
  }

  validateToken() {
    this.dataService.autheticated()
      .subscribe({next: (data: any) => {
          if (data) {
            if(this.hasJson){
              this.getConfigurationJson();                  
            } else {
              this.showContent = true;
              this.showMsj = true;
              this.spinner.hide();
            }
          }
        },
        error: (error) => {
          switch (error.status) {
            case 401:
              this.message = "Usuario No autorizado.";
              this.showMsj = true;
              break;
            case 500:
              this.message = "Error en el servicio de autorización.";
              this.showMsj = true;
              break;
            default:
              this.message = "Error de comunicación.";
              this.showMsj = true;
              break;
          }
          this.showContent = false;         
        }}
      );
  }


  getQueryParamsIntranet(): void {
    this.activatedRoute.queryParams.subscribe((
      (params: any) => {
        if (params?.token) {
          this.storageService.userLogged = params?.token.split(';')[0];
          this.showContent = true;
          this.showMsj = true;
          this.spinner.hide();
        }
      }
    ));
  }

  getConfigurationJson(){

  }

  handlerBack(newRoute: string): void {
    const navigationExtras: NavigationExtras = { queryParams: { token: this.storageService.userLogged } };
    this.router.navigate([newRoute], navigationExtras);
  }
}

