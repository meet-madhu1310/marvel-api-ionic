import { Component } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx'
import { LoadingController } from '@ionic/angular'
import { from } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { Md5 } from 'ts-md5/dist/md5'

import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data = []
  imageData = []

  //DATA FOR HASH
  timeStamp = Date.now()
  privateKey = 'e3e2db831d87d93f01ede25bfdc6bd0d46ac9fa6'
  publicKey = '89dd9f6152897008a59e0050cecf5713'

  //HASH
  hash = Md5.hashStr(this.timeStamp + this.privateKey + this.publicKey)
  
  constructor(private nativeHttp: HTTP, private loadingCtrl: LoadingController, private route: Router) {}

  nextPage() {
    this.route.navigate(['/view-comics'])
  }

  async ionViewDidEnter() {
    //WAIT FOR DATA TO FETCH
    let loading = await this.loadingCtrl.create()
    await loading.present()

    //CALL API
    let nativeCall = this.nativeHttp.get(
      `https://gateway.marvel.com:443/v1/public/characters?limit=10&` + `ts=${this.timeStamp}&` + `apikey=${this.publicKey}&` + `hash=${this.hash}`,
      {},
      {'Content-Type' : 'application/json; charset=utf-8'}
    )
    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    ).subscribe(data => {
      this.data = JSON.parse(data.data).data.results
    }, err => {
      console.log('Show me errors: ', err)
    })
  }

  //SEARCHBAR DATA
  getCharacter(ev) {
    let val = ev.target.value

    //CALL API
    let nativeCall = this.nativeHttp.get(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${val}&limit=15&` + `ts=${this.timeStamp}&` + `apikey=${this.publicKey}&` + `hash=${this.hash}`,
      {},
      {'Content-Type' : 'application/json; charset=utf-8'}
    )
    from(nativeCall).subscribe(data => {
      this.data = JSON.parse(data.data).data.results
    }, err => {
      console.log('Show me errors: ', err)
    })
    //END

    if(val && val.trim() != '') {
      this.data = this.data.filter((result) => {
        return (result.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    } else {
      this.ionViewDidEnter()
    }
  }

}
