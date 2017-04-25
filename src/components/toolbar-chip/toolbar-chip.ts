import { Component } from '@angular/core';

import { AubergineService } from '../../services/aubergine.service';

@Component({
  selector: 'toolbar-chip',
  templateUrl: 'toolbar-chip.html'
})
export class ToolbarChip {

  constructor(public aubergineService: AubergineService) {
    
  }

}
