import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore({
  reducer: { user },
});

import HomeScreen from './screens/HomeScreen';
import FilmsScreen from './screens/FilmsScreen';
import FavorisScreen from './screens/FavorisScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = '';
          if (route.name === 'Films') {
            iconName = 'film';
          } else if (route.name === 'Favoris') {
            iconName = 'star';
          }

          return <FontAwesomeIcon name={iconName} color={color} size={size} />
        },
        tabBarActiveTintColor: '#e8be4b',
        tabBarInactiveTintColor: '#b2b2b2',
        headerShown: false,
      })}
    >
      <Tab.Screen name='Films' component={FilmsScreen} />
      <Tab.Screen name='Favoris' component={FavorisScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='TabNavigator' component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
