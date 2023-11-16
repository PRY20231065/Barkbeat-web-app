import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/layout/manage/model/menu/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  public MenuGuard: boolean;
  menu: Menu[];
  menulocal: any[];
  HoverOpen: string;
  sactive: string;

  constructor(private router: Router) {} 

  ngOnInit() {
    this.MenuGuard = sessionStorage.getItem('Guard') !== null ? true : false;
    if (this.MenuGuard === true) {
      this.menu = JSON.parse(sessionStorage.getItem('Menu'));
    }
    this.sactive = '';
    
    this.setImages();
  }

  inicio(){
    this.router.navigate(['/manage/inicio']);
  }

  setImages() {
    if (this.menu != null) {
      this.menu.map( function (dato) {
      });
    }
  }

  setMenuActive(nidresource: number, nidfather: number) {
    this.menulocal = JSON.parse(sessionStorage.getItem('Menu'));

    this.menulocal.map( function (dato) {

      if (nidresource === 0 && nidfather === 0) {
        this.sactive = 'open';
      }

      if (dato.nidresource === nidresource && nidfather === 0) {
        dato.sactive = 'open';
      } else {
        if (dato.nidresource !== nidresource && nidfather === 0) {
          dato.sactive = '';
        }
      }

      if (dato.nidresource === nidfather && nidfather !== 0) {
        dato.items.map( function (item) {
          if (item.nidresource === nidresource) {
            item.sactive = 'open';
          } else {
            if (item.nidresource !== nidresource) {
              item.sactive = '';
            }
          }
        });
      } else {
        if (dato.nidresource !== nidfather && nidfather !== 0) {
          dato.items.map( function (item) {
            item.sactive = '';
          });
        }
      }

    });
    this.menu = this.menulocal;
    sessionStorage.setItem('Menu', JSON.stringify(this.menulocal));
  }
}
