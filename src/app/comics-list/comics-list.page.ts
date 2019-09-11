import { Component } from '@angular/core';

import { ActivatedRoute, Router, NavigationExtras } from '@angular/router'

import { HTTP } from '@ionic-native/http/ngx'
import { LoadingController } from '@ionic/angular'
import { from } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { Md5 } from 'ts-md5/dist/md5'

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.page.html',
  styleUrls: ['./comics-list.page.scss'],
})
export class ComicsListPage {

  data = []
  characterId: any

  //DATA FOR HASH
  timeStamp = Date.now()
  privateKey = 'YOUR_PRIVATE_KEY'
  publicKey = 'YOUR_PUBLIC_KEY'

  //HASH
  hash = Md5.hashStr(this.timeStamp + this.privateKey + this.publicKey)

  constructor(private route: ActivatedRoute, private router: Router, private nativeHttp: HTTP, private loadingCtrl: LoadingController) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.characterId = this.router.getCurrentNavigation().extras.state.id
      }
    })
  }

  //API CALL
  async ionViewDidEnter() {
    console.log('On detail page id: ', this.characterId)
    let loading = await this.loadingCtrl.create()
    await loading.present()

    let nativeCall = this.nativeHttp.get(
      `https://gateway.marvel.com:443/v1/public/characters/${this.characterId}/comics?limit=50&` + `ts=${this.timeStamp}&` + `apikey=${this.publicKey}&` + `hash=${this.hash}`,
      {},
      {'Content-Type' : 'application/json; charset=utf-8'}
    )
    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    ).subscribe(data => {
      this.data = JSON.parse(data.data).data.results
    }, err => {
      console.log('Show me errors on detail page: ', err)
    })
  }

  //GO TO COMICS DETAIL PAGE
  public goToViewComics(id: any) {
    let navExtras: NavigationExtras = {
      state: {
        id: id
      }
    }
    this.router.navigate(['/view-comics'], navExtras)
  }

}
