import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './services/chat.service';
import { SocketService } from './services/socket.service';
import { CommonService } from './services/common.service';
import { SystemService } from './services/system.service';
import { ReportsService } from './services/reports.service';
import { ApisService } from './services/apis.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ChatService, SocketService, CommonService, SystemService, ReportsService, ApisService, AuthService]
})
export class AppComponent implements OnInit{
  title = 'balboa';

  ngOnInit() {
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        // The page was restored from the browser cache (BFCache)
        // Force a reload or a re-check of the auth status
        window.location.reload(); 
      }
    });
  }
}
