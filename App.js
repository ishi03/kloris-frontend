import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CounterScreen from "./src/screens/CounterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import TaskScreen from "./src/screens/TaskScreen";
import PlantScreen from "./src/screens/PlantScreen";
import GardenScreen from "./src/screens/GardenScreen";
import Login from "./src/screens/Login";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Counter: CounterScreen,
    Task: TaskScreen,
    Plantprofile: PlantScreen,
    garden: GardenScreen,
    login:Login
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Kloris",
    },
  }
);

export default createAppContainer(navigator);
