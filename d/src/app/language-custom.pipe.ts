import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { LanguageconvertService } from './services/languageconvert.service';
import { MessengerService } from './services/messenger.service';

@Pipe({
  name: 'languageCustom'
})
export class LanguageCustomPipe implements PipeTransform {
  demo:any
  languageShow:any
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  constructor(private http:HttpClient,private lang:LanguageconvertService,
              private msg:MessengerService){
                
            } 
  


 async transform(value: any){ 
    let language:any = localStorage.getItem('languageName')
    this.languageShow = JSON.parse(language)
    if(this.languageShow=="ltr"){
      return value
    }else{
        let key="AIzaSyCxTvoFIzYZPhK4AaqQSmo8o6-Ow2DRW5k"
        let modal={
          "q": [value],
          "target": "ar" 
        } 
        await this.http.post("https://translation.googleapis.com/language/translate/v2?key="+key,modal).toPromise().then((data:any)=>{
          value=data.data?.translations[0]?.translatedText
        }) 
        return value
    }
   
  } 

}
