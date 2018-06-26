import {
  Component,
  OnInit
} from '@angular/core';
import {
  CentBackendService
} from '../cent-backend.service';

@Component({
  selector: 'app-add-cent',
  templateUrl: './add-cent.component.html',
  styleUrls: ['./add-cent.component.css']
})
export class AddCentComponent implements OnInit {
  private response;

  constructor(private backEndClient: CentBackendService) {}

  ngOnInit() {
    this.backEndClient.connectionTest().subscribe((data) => {
      this.response = data;
    });
    }

  }
