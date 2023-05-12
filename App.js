import 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import CounterScreen from "./src/screens/CounterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import TaskScreen from "./src/screens/TaskScreen";
import PlantScreen from "./src/screens/PlantScreen";
import GardenScreen from "./src/screens/GardenScreen";
import Login from "./src/screens/Login";
import ForumScreen from "./src/screens/ForumScreen";
import QuestionScreen from "./src/screens/QuestionScreen";
import CamScreen from './src/screens/CamScreen';
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { setOutNavigator } from "./src/navigationRef";
import AddPost from "./src/screens/AddPost";
import NewReccScreen from './src/screens/NewReccScreen';
import LandingReccScreen from './src/screens/LandingReccScreen';
import ExReccScreen from './src/screens/ExReccSystem';
import ReccScreen from './src/screens/ReccsScreen';
import ReccsScreenTwo from './src/screens/ReccsScreenTwo';
import PlantReccScreen from './src/screens/PlantReccScreen';
import Search from './src/components/Search';
import Icon from 'react-native-vector-icons/Octicons';
import { TouchableOpacity, Text } from 'react-native';

const navigator1 = createStackNavigator(
  {
    Home: HomeScreen,
    Counter: CounterScreen,
    Task: TaskScreen,
    Plantprofile: PlantScreen,
    garden: GardenScreen,
    login:Login,
    forum: ForumScreen,
    QuestionPage: QuestionScreen,
    AddPost: AddPost
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Kloris",
    },
  }
);

const navigator = createSwitchNavigator(
  {
    loginFlow:createStackNavigator({
      login:Login,
      // signup 
    }),
    mainFlow:createMaterialBottomTabNavigator({
      Home: {
        screen: Search, //CamScreen, 
        navigationOptions: {
        tabBarLabel: "Homee", // lablel of the tab
        tabBarIcon: ({tintColor}) => { // Setting icon of the tab
          return (
          <Icon name="rocket" size={21} color = {tintColor}/>
          );
        },
        }},

      taskFlow:{
        screen: createStackNavigator({
          Task: TaskScreen,
          Plantprofile: PlantScreen,
          garden: GardenScreen,
        }),
          navigationOptions:{
            // headerRight: ()=>(
            //   <TouchableOpacity>
            //    <Text>Xxxx</Text>
            //   </TouchableOpacity>
            // ),
            tabBarLabel: 'Tasks',
            tabBarIcon: ({tintColor})=>(  
              <Icon name="tasklist" color={tintColor} size={21}/>  
          )  
          }
      },
      reccFlow:{
        screen: createStackNavigator({
          newRecc: NewReccScreen,
          landingRecc: PlantScreen,
          exRecc: GardenScreen,
          recommendations: ReccScreen,
          newRecommendations : ReccsScreenTwo,
          plantRecc: PlantReccScreen,
        }),
          navigationOptions:{
            tabBarLabel: 'Recommendation',
            tabBarIcon: ({tintColor})=>(  
              <Icon name="star" color={tintColor} size={21}/>  
          )  
          }
      },
      forumFlow:{
        screen: createStackNavigator({
          forum: ForumScreen,
          QuestionPage: QuestionScreen,
          AddPost: AddPost,
        }),
          navigationOptions:{
            tabBarLabel: 'Discussions',
            tabBarIcon: ({tintColor})=>(  
              <Icon name="comment-discussion" color={tintColor} size={21}/>  
          )  
          }
      },
    },{
      initialRouteName: 'taskFlow',
      activeColor: '#388000',
      inactiveColor: '#D6E8C8',
      barStyle: { backgroundColor: '#ffffff' },
      shifting: false,
      labeled: true,
    }),
  },
  {
    initialRouteName: "loginFlow",
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