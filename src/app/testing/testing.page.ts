import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

import { Md5 } from 'ts-md5/dist/md5'

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage {
  data = []

  constructor(private http: HttpClient, private loadingCtrl: LoadingController) { }

  async ionViewDidEnter() {
    let loading = await this.loadingCtrl.create()
    await loading.present()

    //DATA FOR HASH
    let timeStamp = Date.now()
    let privateKey = 'e3e2db831d87d93f01ede25bfdc6bd0d46ac9fa6'
    let publicKey = '89dd9f6152897008a59e0050cecf5713'

    //HASH
    let hash = Md5.hashStr(timeStamp + privateKey + publicKey)

    this.http.get(`https://gateway.marvel.com:443/v1/public/characters?` + `ts=${timeStamp}&` + `apikey=${publicKey}&` + `hash=${hash}`).pipe(
      finalize(() => loading.dismiss())
    ).subscribe(data => {
      this.data = data['data']
      console.log('Check test page data here: ', this.data)
    }, err => {
      console.log('Show me test page error: ', err)
    })
  }

}
