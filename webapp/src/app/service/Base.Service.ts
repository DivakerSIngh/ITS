export const BaseService= {
    _baseServiceUrl:  "http://localhost:3040/api/"
    
}
import {Headers} from '@angular/http'
export class ApplicationHeader {
getHeaderOfProfilePic() {
    let headers = new Headers();
    headers.append('Content-Type', "application/json")
   // headers.append('auth-token', localStorage.getItem('auth-token'))
    return headers;
  }
}