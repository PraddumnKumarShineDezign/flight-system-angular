import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxUiLoaderModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Flight System';
}
