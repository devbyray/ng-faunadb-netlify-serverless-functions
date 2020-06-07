import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'ng-faunadb-netlify-serverless-functions'

	constructor(private http: HttpClient) {}

	ngOnInit() {
		this.http.get('http://localhost:9000/.netlify/functions/products').subscribe((response) => {
			console.log('response: ', response)
		})
	}
}
