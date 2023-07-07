import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';

const Tab = createBottomTabNavigator();
const SwitchStack = createStackNavigator();
const AuthStack = createStackNavigator();

const routeIcon = {
  Feed: 'home',
  AddPhoto: 'camera',
  Profile: 'person',
};

const Auth = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Register} />
  </AuthStack.Navigator>
);

const AuthOrProfile = ({isLogged}) => (
  <SwitchStack.Navigator screenOptions={{headerShown: false}}>
    {isLogged ? (
      <SwitchStack.Screen name="Home" component={Profile} />
    ) : (
      <SwitchStack.Screen name="Auth" component={Auth} />
    )}
  </SwitchStack.Navigator>
);

export default props => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Ionicons name={routeIcon[route.name]} size={size} color={color} />
          ),
        })}>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="AddPhoto" component={AddPhoto} />
        <Tab.Screen
          name="Profile"
          component={<AuthOrProfile isLogged={isLogged} />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
