import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'icon-trashcan',
  templateUrl: './trashcan.component.html',
  host: {
    class: 'trashcan-icon'
  }
})
export class TrashcanIconComponent {

  @HostBinding('class') class = 'trashcan-icon';

}
