import{combineReducers} from 'redux'

import home from './homeReducer'
import system from './systemReducer'
import project from './projectReducer'
import user from './userReducer'

export default function getRootReducers(navReducer){

    return combineReducers({
        user:user,
        home:home,
        system:system,
        project:project,
        nav:navReducer
    })

}