import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  API_KEY = 'a140d9f145774014b3b364de40d68d54'

  constructor(private httpClient: HttpClient) { }

  getNews() {
    return this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${this.API_KEY}`)
  }

}
