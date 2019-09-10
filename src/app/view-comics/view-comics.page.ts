import { Component } from '@angular/core';

import { HTTP } from '@ionic-native/http/ngx'
import { LoadingController } from '@ionic/angular'
import { from } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { Md5 } from 'ts-md5/dist/md5'

import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ActivatedRoute, Router } from '@angular/router'

// @IonicPage()
@Component({
  selector: 'app-view-comics',
  templateUrl: './view-comics.page.html',
  styleUrls: ['./view-comics.page.scss'],
})
export class ViewComicsPage {
  data = []
  characterId: any
  
  constructor(private nativeHttp: HTTP, private loadingCtrl: LoadingController, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.characterId = this.router.getCurrentNavigation().extras.state.id
      }
    })
  }

  async ionViewDidEnter() {
    //WAIT FOR DATA TO FETCH
    let loading = await this.loadingCtrl.create()
    await loading.present()

    //DATA FOR HASH
    let timeStamp = Date.now()
    let privateKey = 'YOUR_PRIVATE_KEY'
    let publicKey = 'YOUR_PUBLIC_KEY'

    //HASH
    let hash = Md5.hashStr(timeStamp + privateKey + publicKey)

    //CALL API
    let nativeCall = this.nativeHttp.get(
      `https://gateway.marvel.com:443/v1/public/characters/${this.characterId}/comics?` + `ts=${timeStamp}&` + `apikey=${publicKey}&` + `hash=${hash}`,
      {},
      {'Content-Type' : 'application/json; charset=utf-8'}
    )
    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    ).subscribe(data => {
      let parsed = JSON.parse(data.data).data.results
      this.data = parsed
      console.log('Check COMICS data: ', this.data)
    }, err => {
      console.log('Show me COMICS error: ', err)
    })
  }
}
