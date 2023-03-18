let outNavigator;
import { NavigationAction, NavigationActions } from "react-navigation";

export const setOutNavigator = (nav)=>{
    outNavigator=nav;
}

// when we want to navigate around in our app from outside react components, we import outNavigate function
export const outNavigate = (routeName, params)=>{
    outNavigator.dispatch(
        NavigationActions.navigate({routeName,params}) // as parameters have same name as value; {a:a} can be written as {a}
    )
}