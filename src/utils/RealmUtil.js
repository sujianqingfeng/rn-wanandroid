import Realm from 'realm'


export default class RealmUtil {

    static getRealm() {

        const CookieSchema = {
            name: 'Cookie',
            properties: {
                cookie: 'string'
            }
        }
        return new Realm({ schema: [CookieSchema] });

    }
}