import React,{useState, useContext} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput, Button, Text} from 'react-native';
import {AuthContext} from './AuthProvider';

export default function Register({navigation}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {registerFn} = useContext(AuthContext);
  

  return (
    <SafeAreaView>
        <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Name"
        onChangeText={text=>setUserName(text)}
        value={userName}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Email"
        onChangeText={text=>setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Password"
        onChangeText={text=>setPassword(text)}
        value={password}
        textContentType="password"
        secureTextEntry={true}
      />
      <Button title="Register" color="green" onPress={()=>registerFn(email, password )}/>
     <Text onPress={()=>navigation.navigate('Login')}>Have an account? Sign in now.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    height:"100%",
  },
  inputField:{
      height:45,
      backgroundColor:'white',
      marginBottom:10,
      width:"90%",
      borderBottomWidth:1,
      borderBottomColor:"green",
      borderRadius:2
  }
});
