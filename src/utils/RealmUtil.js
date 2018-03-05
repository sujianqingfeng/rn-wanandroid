
 import Realm from 'realm'

export default class RealmUtil {
   
    static getRealm(){
        const CookieSchema = {
            name: 'Cookie',
            properties: {
                cookie: 'string'
            }
        }

        const ThemeSchema = {
            name:'Theme',
            properties:{
                color:'string'
            }
        } 
        return new Realm({ schema: [CookieSchema,ThemeSchema] })
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

    static getThemeColor(){
        let realm = this.getRealm()
        const colors = realm.objects('Theme')
        if (colors.length > 0) {
            return colors[0].color
        }
        else{
            const color = '#E91E63'
            this.saveThemeColor(color)    
            return color
        }
    }
    
    static saveThemeColor(color){
        let realm = this.getRealm()
        realm.write(() => {
            let colors = realm.objects('Theme')
            if (colors.length > 0) {
                colors[0].color = color
            } else {
                realm.create('Theme', { color: color })
            }
        })
    }
}