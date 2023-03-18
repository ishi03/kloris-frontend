import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CounterScreen from "./src/screens/CounterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import TaskScreen from "./src/screens/TaskScreen";
import PlantScreen from "./src/screens/PlantScreen";
import GardenScreen from "./src/screens/GardenScreen";
import Login from "./src/screens/Login";
import ForumScreen from "./src/screens/ForumScreen";
import PostScreen from "./src/screens/PostScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setOutNavigator } from "./src/navigationRef";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Counter: CounterScreen,
    Task: TaskScreen,
    Plantprofile: PlantScreen,
    garden: GardenScreen,
    login:Login,
    forum: ForumScreen,
    postpage: PostScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Kloris",
    },
  }
);

const App = createAppContainer(navigator);

export default ()=>{
  return(
    <AuthProvider>
      <App ref={(outNavigator)=>{setOutNavigator(outNavigator)}}/>
    </AuthProvider>
  )
}