import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ng9PasswordStrengthBarComponent } from 'ng9-password-strength-bar';
import { AuthService } from 'src/app/services/auth.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  public barLabel: string = "Password strength:";
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public thresholds = [90, 75, 45, 25];
  passwordFeild1= "password"
  passwordFeild2= "password"
  count=8
  passwordStrength=""
  signUpForm!: FormGroup;
  confirmPasswordField = ""
  selectedCountry = "Your Nationality"
  passwordMatch:any
  acceptPolicy = false
  acceptPrivacyPolicy = false
  acceptSMS = false
  country:any = []
  conditionOne=false
  conditionTwo=false
  conditionThree=false
  checkNum=""
  is_number=false
  poor=false
  medium=false
  strong=false
  numberCount=9
  ahlanCartPass=""
  cus_email:any=''
  cus_pass=""
  cus_mobile:any=''
  cus_fname:any=''
  cus_lname:any=''
  cus_country:any=null
  cus_gender:any=null
  access_site:any=null
  cus_email_fill=false
  cus_pass_fill=false
  cus_mobile_fill=false
  cus_fname_fill=false
  cus_lname_fill=false 
  cus_country_fill=false
  cus_gender_fill=false
  isChecked=false
  isBtn_disabled=false
  hide = true;
  alternative_mobile_no:any
  cell_code1:any 
  country_code:any="971"
  contact:any
  isLoading=false
  conutryList:any=[
    {"name":"Afghanistan","code":"+93"},{"name":"Albania","code":"+355"},{"name":"Algeria","code":"+213"},
    {"name":"American Samoa","code":"+1-684"},{"name":"Andorra","code":"+376"},{"name":"Angola","code":"+244"},
    {"name":"Anguilla","code":"+1-264"},{"name":"Antarctica","code":"+672"},{"name":"Antigua and Barbuda","code":"+1-268"},
    {"name":"Argentina","code":"+54"},{"name":"Armenia","code":"+374"},{"name":"Aruba","code":"+297"},
    {"name":"Australia","code":"+61"},{"name":"Austria","code":"+43"},{"name":"Azerbaijan","code":"+994"},
    {"name":"Bahamas","code":"+1-242"},{"name":"Bahrain","code":"+973"},{"name":"Barbados","code":"+1-246"},
    {"name":"Bangladesh","code":"+880"},{"name":"Belarus","code":"+375"},{"name":"Belgium","code":"+32"},
    {"name":"Belize","code":"+501"},{"name":"Benin","code":"+229"},{"name":"Bermuda","code":"+1-441"},
    {"name":"Bhutan","code":"+975"},{"name":"Bolivia","code":"+591"},{"name":"Bosnia and Herzegovina","code":"+387"},
    {"name":"Botswana","code":"+267"},{"name":"Brazil","code":"+55"},{"name":"British Indian Ocean Territory","code":"+246"},
    {"name":"British Virgin Islands","code":"+1-284"},{"name":"Brunei","code":"+673"},{"name":"Bulgaria","code":"+359"},
    {"name":"Burkina Faso","code":"+226"},{"name":"Burundi","code":"+257"},{"name":"Cambodia","code":"+855"},
    {"name":"Cameroon","code":"+237"},{"name":"Canada","code":"+1"},{"name":"Cape Verde","code":"+1-345"},
    {"name":"Cayman Islands","code":"+1-345"},{"name":"Central African Republic","code":"+236"},{"name":"Chad","code":"+235"},
    {"name":"Chile","code":"+56"},{"name":"China","code":"+86"},{"name":"Christmas Island","code":"+61"},
    {"name":"Cocos Islands","code":"+61"},{"name":"Colombia","code":"+57"},{"name":"Comoros","code":"+269"},
    {"name":"Cook Islands","code":"+682"},{"name":"Costa Rica","code":"+506"},{"name":"Croatia","code":"+385"},
    {"name":"Cuba","code":"+53"},{"name":"Curacao","code":"+599"},{"name":"Cyprus","code":"+357"},
    {"name":"Czech Republic","code":"+420"},{"name":"Democratic Republic of the Congo","code":"+43"},{"name":"Denmark","code":"+45"},
    {"name":"Djibouti","code":"+253"},{"name":"Dominica","code":"+1-767"},{"name":"Dominican Republic","code":"+1-809"},
    {"name":"East Timor","code":"+670"},{"name":"Ecuador","code":"+593"},{"name":"Egypt","code":"+20"},
    {"name":"El Salvador","code":"+503"},{"name":"Equatorial Guinea","code":"+240"},{"name":"Eritrea","code":"+291"},
    {"name":"Estonia","code":"+372"},{"name":"Ethiopia","code":"+251"},{"name":"Falkland Islands","code":"+500"},
    {"name":"Faroe Islands","code":"+298"},{"name":"Fiji","code":"+679"},{"name":"Finland","code":"+358"},
    {"name":"France","code":"+33"},{"name":"French Polynesia","code":"+689"},{"name":"Gabon","code":"+241"},
    {"name":"Gambia","code":"+220"},{"name":"Germany","code":"+49"},{"name":"Ghana","code":"+223"},
    {"name":"Gibraltar","code":"+233"},{"name":"Greece","code":"+30"},{"name":"Greenland","code":"+299"},
    {"name":"Grenada","code":"+1-473"},{"name":"Guam","code":"+1-671"},{"name":"Guatemala","code":"+502"},
    {"name":"Guernsey","code":"+44-1481"},{"name":"Guinea","code":"+224"},{"name":"Guinea-Bissau","code":"+245"},
    {"name":"Haiti","code":"+509"},{"name":"Honduras","code":"+504"},{"name":"Hong Kong","code":"+852"},
    {"name":"Hungary","code":"+36"},{"name":"Iceland","code":"+354"},{"name":"India","code":"+91"},
    {"name":"Indonesia","code":"+62"},{"name":"Iran","code":"+98"},{"name":"Iraq","code":"+964"},
    {"name":"Ireland","code":"+353"},{"name":"Isle of Man","code":"+44-1624"},{"name":"Israel","code":"+972"},
    {"name":"Italy","code":"+39"},{"name":"Ivory Coast","code":"+225"},{"name":"Jamaica","code":"+1-876"},
    {"name":"Japan","code":"+81"},{"name":"Jersey","code":"+44-1534"},{"name":"Jordan","code":"+962"},
    {"name":"Kazakhstan","code":"+7"},{"name":"Kenya","code":"+254"},{"name":"Kiribati","code":"+686"},
    {"name":"Kosovo","code":"+383"},{"name":"Kuwait","code":"+965"},{"name":"Kyrgyzstan","code":"+996"},
    {"name":"Laos","code":"+856"},{"name":"Lebanon","code":"+961"},{"name":"Latvia","code":"+371"},
    {"name":"Lesotho","code":"+266"},{"name":"Liberia","code":"+231"},{"name":"Libya","code":"+218"},
    {"name":"Liechtenstein","code":"+423"},{"name":"Lithuania","code":"+370"}, {"name":"Luxembourg","code":"+352"},
    {"name":"Macau","code":"+853"},{"name":"Macedonia","code":"+389"},{"name":"Madagascar","code":"+261"},{"name":"Malawi","code":"+265"},
    {"name":"Malaysia","code":"+60"},{"name":"Maldives","code":"+960"},{"name":"Mali","code":"+223"},
    {"name":"Malta","code":"+356"},{"name":"Marshall Islands","code":"+692"},{"name":"Mauritania","code":"+222"},
    {"name":"Mauritius","code":"+230"},{"name":"Mayotte","code":"+262"},{"name":"Mexico","code":"+52"},
    {"name":"Micronesia","code":"+691"},{"name":"Moldova","code":"+373"},{"name":"Monaco","code":"+377"},
    {"name":"Mongolia","code":"+976"},{"name":"Montenegro","code":"+382"},{"name":"Montserrat","code":"+1-664"},
    {"name":"Morocco","code":"+212"},{"name":"Mozambique","code":"+258"},{"name":"Myanmar","code":"+95"},
    {"name":"Namibia","code":"+264"},{"name":"Nauru","code":"+674"},{"name":"Nepal","code":"+977"},
    {"name":"Netherlands","code":"+31"},{"name":"Netherlands Antilles","code":"+599"},{"name":"New Caledonia","code":"+687"},
    {"name":"Nicaragua","code":"+505"},{"name":"Niger","code":"+227"},{"name":"Nigeria","code":"+234"},
    {"name":"Niue","code":"+683"},{"name":"North Korea","code":"+850"},{"name":"Northern Mariana Islands","code":"+1-670"},
    {"name":"Norway","code":"+47"},{"name":"Oman","code":"+968"},{"name":"Pakistan","code":"+92"},
    {"name":"Palau","code":"+680"},{"name":"Palestine","code":"+970"},{"name":"Panama","code":"+507"},
    {"name":"Papua New Guinea","code":"+675"},{"name":"Paraguay","code":"+595"},{"name":"Philippines","code":"+63"},
    {"name":"Pitcairn","code":"+64"},{"name":"Poland","code":"+48"},{"name":"Portugal","code":"+351"},
    {"name":"Puerto Rico","code":"+1-787"},{"name":"Qatar","code":"+974"},{"name":"Republic of the Congo","code":"+242"},
    {"name":"Reunion","code":"+262"},{"name":"Romania","code":"+240"},{"name":"Russia","code":"+7"},
    {"name":"Rwanda","code":"+250"},{"name":"Saint Barthelemy","code":"+590"},{"name":"Saint Helena","code":"+290"},
    {"name":"Saint Kitts and Nevis","code":"+1-869"},{"name":"Saint Lucia","code":"+1-758"},{"name":"Saint Martin","code":"+590"},
    {"name":"Saint Pierre and Miquelon","code":"+508"},{"name":"Saint Vincent and the Grenadines","code":"+1-784"},
    {"name":"Samoa","code":"+685"},{"name":"San Marino","code":"+378"},{"name":"Sao Tome and Principe","code":"+239"},
    {"name":"Saudi Arabia","code":"+966"},{"name":"Senegal","code":"+221"},{"name":"Serbia","code":"+381"},
    {"name":"Seychelles","code":"+248"},{"name":"Sierra Leone","code":"+232"},{"name":"Singapore","code":"+65"},
    {"name":"Sint Maarten","code":"+1-721"},{"name":"Slovakia","code":"+421"},{"name":"Slovenia","code":"+386"},
    {"name":"Solomon Islands","code":"+677"},{"name":"Somalia","code":"+252"},{"name":"South Africa","code":"+27"},
    {"name":"South Korea","code":"+82"},{"name":"South Sudan","code":"+211"},{"name":"Spain","code":"+34"},
    {"name":"Sri Lanka","code":"+94"},{"name":"Sudan","code":"+249"},{"name":"Suriname","code":"+597"},
    {"name":"Svalbard and Jan Mayen","code":"+47"},{"name":"Swaziland","code":"+268"},{"name":"Sweden","code":"+46"},
    {"name":"Switzerland","code":"+41"},{"name":"Syria","code":"+963"},{"name":"Taiwan","code":"+886"},
    {"name":"Tajikistan","code":"+991"},{"name":"Tanzania","code":"+255"},{"name":"Thailand","code":"+66"},
    {"name":"Togo","code":"228+"},{"name":"Tokelau","code":"+690"},{"name":"Tonga","code":"+676"},
    {"name":"Trinidad and Tobago","code":"+1-868"},{"name":"Tunisia","code":"+216"},{"name":"Turkey","code":"+90"},
    {"name":"Turkmenistan","code":"+993"},{"name":"Turks and Caicos Islands","code":"+1-649"},{"name":"Tuvalu","code":"+688"},
    {"name":"U.S. Virgin Islands","code":"+1-340"},{"name":"Uganda","code":"+256"},{"name":"Ukraine","code":"+380"},
    {"name":"United Arab Emirates","code":"+971"},{"name":"United Kingdom","code":"+44"},{"name":"United States","code":"+1"},
    {"name":"Uruguay","code":"+598"},{"name":"Uzbekistan","code":"+998"},{"name":"Vanuatu","code":"+678"},
    {"name":"Vatican","code":"+379"},{"name":"Venezuela","code":"+58"},{"name":"Vietnam","code":"+84"},
    {"name":"Wallis and Futuna","code":"+681"},{"name":"Western Sahara","code":"+212"},{"name":"Yemen","code":"+967"},
    {"name":"Zambia","code":"+58"},{"name":"Zimbabwe","code":"+263"}
  ]
  gender_active=false
  is_country_Active=false
  contry_code_list=environment.conutryList

  constructor(
    private messageService:MessengerService, private auth:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.auth.getCountry().subscribe((data:any)=>{
      this.country= Object.values(data.data) 
    })
  }
  
  onChanegegender(e:any){
    if(e=="Select Gender"){
      this.cus_gender=null
    }else{
      this.cus_gender=e.target.value
    }
  }


  currentCountry(e:any){
    if(e=="Select Country"){
      this.cus_country=null
    }else{
      this.cus_country=e.target.value 
    }
  }

  showPassword1(){
    this.passwordFeild1 = 'text'
    setTimeout(() => {
      this.passwordFeild1 = 'password'
    }, 1100);
  }

  showPassword2(){
    this.passwordFeild2 = 'text'
    setTimeout(() => {
      this.passwordFeild2 = 'password'
    }, 1100);
  }

  confirmPassword(e:any){
    let password:any=e.target.value
    if(this.signUpForm.value.password == this.signUpForm.value.confirmPassword){
      this.passwordMatch = true
    }else{
      this.passwordMatch = false
    }
  }

  confirmPasswordWorks(){
    if(this.signUpForm.value.confirmPassword =='')return
    if(this.signUpForm.value.password == this.signUpForm.value.confirmPassword){
      this.passwordMatch = true
    }else{
      this.passwordMatch = false
    }
  }

 
 
  numberValidate(num:any){
    let number=String(num)
      if(number == "" || number.length < this.numberCount || number.length >this.numberCount){
        this.is_number=true
      }else if(number.length==this.numberCount){
        this.is_number=false
      }
  }

  get phone() {
    return this.signUpForm.get('phone');
  }


  onSignUp(){

    // this.router.navigate(['/auth/otp'])
    // this.cus_fname_fill = this.cus_fname == null || this.cus_fname == '' ?true:false    
    // this.cus_lname_fill = this.cus_lname==null || this.cus_lname== '' ?true:false
    // this.cus_email_fill = this.cus_email==null || this.cus_email== '' ?true:false
    // this.cus_mobile_fill = this.cus_mobile==null || this.cus_mobile== '' ?true:false
    // this.cus_gender_fill = this.cus_gender==null || this.cus_gender=="Select Gender" ?true:false
    // this.cus_country_fill = this.cus_country==null || this.cus_country=="Select Country" ?true:false
    // this.cus_pass_fill=this.cus_pass.length<this.count||this.cus_pass==null ?true:false
    // console.log("value:",this.cus_fname_fill,this.cus_lname_fill,
    // this.cus_email_fill,this.cus_mobile_fill,this.cus_gender_fill,this.cus_country_fill,this.cus_pass_fill);
    let signup={
      fname:this.cus_fname,
      lname:this.cus_lname,
      email:this.cus_email,
      mobile:"+"+this.country_code+this.cus_mobile,
      gender:this.cus_gender,
      password:this.cus_pass,
      country:this.cus_country,
      acess_site:"sidracart"
    }
    this.auth.signupPost(signup)
    this.isLoading=true
    this.messageService.getStatus().subscribe((D:any)=>{
      if(D=='success'){
        this.isLoading = false;
      }else if(D=='failed'){
        this.isLoading = false;
      }
    })
// this.router.navigate(['/auth/otp'])
  }

  
  telInputObject(e:any){
    // this.cus_mobile.setNumber(+91) 
    // this.cellnumber1=e
    this.selectedCountry = e.selectedCountry;
  }

  onPhoneNumberChange(event: any) {
    const countryCode = event ? event.split(' ')[0].replace('+', '') : null;
  }

  onSelectCode(e:any){
    this.country_code=e.target.value
  }

  termsAnduse(e:any){
     if(e.target.checked==true){
        this.isChecked=true
     }else{
        this.isChecked=false
     }
  }

  
}
