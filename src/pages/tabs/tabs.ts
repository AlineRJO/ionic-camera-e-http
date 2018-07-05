import { Component } from '@angular/core';

import { FotoPage } from '../foto/foto';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FotoPage;

  constructor() {

  }
}
