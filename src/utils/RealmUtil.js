
 import Realm from 'realm'

export default class RealmUtil {
   
    static getRealm(){
        const CookieSchema = {
            name: 'Cookie',
            properties: {
                cookie: 'string'
            }
        }
        return new Realm({ schema: [CookieSchema] })
    }

  


    static getCookie(){
        let realm = this.getRealm()
        const cookies = realm.objects('Cookie')
        if (cookies.length > 0) {
            return cookies[0].cookie
        }
        else{  return ''}
          
    }

    static saveCookie(cookie){
        let realm = this.getRealm()
        realm.write(() => {
            let cookies = realm.objects('Cookie')
            if (cookies.length > 0) {
                cookies[0].cookie = cookie
            } else {
                realm.create('Cookie', { cookie: cookie })
            }
        })
    }
}