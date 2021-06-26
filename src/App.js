import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Button, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext, AuthProvider} from './AuthProvider';
import auth from '@react-native-firebase/auth';
import Login from './Login';
import Register from './Register';

function HomeScreen({navigation}) {
  const {logOut} = useContext(AuthContext);
  const buttonpress = () => navigation.navigate('home2');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button onPress={buttonpress} title="changeroute" />
      <Button onPress={logOut} title="Logout" />
    </View>
  );
}
function HomeScreen2() {
  const {logOut} = useContext(AuthContext);
  const buttonpress = e => {
    console.log(e);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.linearGradient}>
        <Button onPress={buttonpress} title="changeroute" />
        <Button onPress={logOut} title="Logout" />
      </LinearGradient>
    </View>
  );
}

/**
 * @description Routing Login
 */
const Stack = createStackNavigator();
const Routing = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen component={Login} name="Login" />
            <Stack.Screen component={Register} name="Register" />
          </>
        ) : (
          <>
            <Stack.Screen component={HomeScreen} name="home" />
            <Stack.Screen component={HomeScreen2} name="home2" />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => (
  <AuthProvider>
    <Routing />
  </AuthProvider>
);

export default App;

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
