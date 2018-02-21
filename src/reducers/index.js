import{combineReducers} from 'redux'

import home from './homeReducer'
import system from './systemReducer'
import project from './projectReducer'
import user from './userReducer'
import hot from './hotReducer'
import search from './searchReducer'
import likeList from './likeListReducer'
import collect from './collectReducer'

export default function getRootReducers(navReducer){

    return combineReducers({
        search:search,
        collect:collect,
        user:user,
        home:home,
        system:system,
        project:project,
        hot:hot,
        like:likeList,
        nav:navReducer
    })

}