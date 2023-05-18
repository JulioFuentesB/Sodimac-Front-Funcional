import { Component, OnInit } from '@angular/core';
import { HeaderObj, PageService } from '../../core/services/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private pageService: PageService
  ) {
    this.pageService.setHeaderPage(new HeaderObj('Bienvenido', '/', false))
  }

  ngOnInit(): void {

  }

}
