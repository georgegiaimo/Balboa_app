import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './services/chat.service';
import { SocketService } from './services/socket.service';
import { CommonService } from './services/common.service';
import { SystemService } from './services/system.service';
import { ReportsService } from './services/reports.service';
import { ApisService } from './services/apis.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ChatService, SocketService, CommonService, SystemService, ReportsService, ApisService]
})
export class AppComponent {
  title = 'balboa';
}
