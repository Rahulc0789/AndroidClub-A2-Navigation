import * as React from 'react';
import { StyleSheet, Text, View, Button, Easing } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator,TransitionPresets,CardStyleInterpolators} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Save"
        onPress={() =>{
          // save the changes
          navigation.replace('Home');
        }}
      /> 
    )
  });
  return(
  <View style={{flex:1,
  alignItems:'center', 
  justifyContent:'center'}}>
    <Text>Home Screen</Text>
    <Button 
      title="Go To Details Screen"
      onPress={()=>navigation.navigate('Details')}
    />
  </View>
  );
};


const SettingsScreen = ({ navigation }) => {
  return(
    <View style={{flex:1, alignItems:'center', justifyContent:
    'center'}}>
      <Text>
        Settings Screen
      </Text>
      <Button title="Go to Home Screen" onPress={()=>
      navigation.goBack()}
      />
    </View>
  );
};

const FeedScreen = props => (
  <View style={{ flex: 1,alignItems: 'center', justifyContent:
  'center' }}>
    <Text>Feed Screen</Text>
  </View>
);

const DetailsScreen = (props) =>(
  <View style={{ flex: 1,alignItems: "center", justifyContent:
  "center"}}>
    <Text>Detail Screen</Text>
  </View>
)

const HomeStackNavigator = ({navigation,route})=>{
  if(route.state){
    navigation.setOptions({
      tabBarVisible:route.state.index > 0 ? false:true
    });
  }
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="Details" component={DetailsScreen}/>
    </HomeStack.Navigator>
  )
}

const HomeTabNavigator = ({navigation,route})=>{
  navigation.setOptions({ headerTitle: getHeaderTitle(route)});
  return(
  <Tab.Navigator screenOptions={({route}) => ({
    tabBarIcon:({color,size}) =>{
      let iconName
      if(route.name == 'Home')
      {
        iconName='ios-home'
      }
      else if(route.name == 'Feed')
      {
        iconName = 'logo-rss'
      }
      else if(route.name == 'Settings')
      {
        iconName = 'ios-settings'
      }
      return<Ionicons name={iconName} size={size} color={color}/>
    }
  })}>
    <Tab.Screen name="Home"  component={HomeStackNavigator}/>
    <Tab.Screen name="Feed" component={FeedScreen}/>
    <Tab.Screen name="Settings" component={SettingsScreen}/>
  </Tab.Navigator>
  );
};

const config ={
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass:3,
    overshootClamping: false,
    restDisplacementThresold: 0.01,
    restSpeedThresold: 0.01,
  },
};

const closeConfig = {
  animation:'timing',
  config:{
    duration:500,
    easing:Easing.linear
  }
}

function getHeaderTitle(route){
  const routeName = route.state ? route.state.routes[route.state.index]
  .name:'Home'

  switch(routeName){
    case 'Home':
      return 'Home'
    case 'Feed':
      return 'Feed'
    case 'Settings':
      return 'Settings'
    }
}
function shouldheaderbeshown(route){
  const routeName = route.state? route.state.routes[route.state.index]
  .name:'Home'
  switch(routeName){
    case 'Home':
    return false
  }
}
function App() {
  return <NavigationContainer>
    <Stack.Navigator
      screenOptions={{gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator:
        CardStyleInterpolators.forFadeFromBottomAndroid
        // transitionSpec:{
        //   open: config,
        //   close: closeConfig
        // }
      }}
      headerMode="float"
      animation="fade"
    >
      <Stack.Screen 
        options={({route})=> ({
          title:getHeaderTitle(route),
          headerShown: shouldheaderbeshown(route),
        })}
        name="Home" 
        component={HomeTabNavigator}
      />
      <Stack.Screen 
        name="Settings"
        component={SettingsScreen} 
      />
    </Stack.Navigator>
  </NavigationContainer>;
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
