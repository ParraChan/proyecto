import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FinancieraAppComponent } from "./components/financiera-app.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FinancieraAppComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'financiera';
}
