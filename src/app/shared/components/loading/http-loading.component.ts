import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-http-loading',
  templateUrl: './http-loading.component.html',
  styleUrl: './http-loading.component.css'
})
export class HttpLoadingComponent {
  @Input() message: string | null = null;
  @Input() width: string | null = null;
  @Input() height: string | null = null;
}
