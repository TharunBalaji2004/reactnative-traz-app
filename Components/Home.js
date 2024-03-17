// HomeScreen.js
import React from 'react';
import { View, Text, Button, Image, StyleSheet,TouchableOpacity } from 'react-native';
import Logo from '../assets/traz.jpg';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* <Image source={require('../assets/traz.jpg')} style={styles.logo} /> */}
        <Image source={require('../assets/traz_logo.png')} style={styles.logoText} />
      </View>
      <View >
        <Text style={styles.quotes} >Empower your trust. Verify the originality, trace every step. Your assurance, our commitment.</Text>
      </View>
      <TouchableOpacity
       
        onPress={() => navigation.navigate('QrCodeScanner')}
        style={styles.button}
      >
         <Text style={styles.butText}>Scan and Trace</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 100,
    backgroundColor: 'white', // Light gray background color
  },
  logoContainer: {
    alignItems: 'center',
    marginTop:200
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20, // Add some margin between logo and logo text
  },
  logoText: {
    width: 300,
    height: 95,
  },
  button: {
    backgroundColor: '#0000FF', // Purple button background color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    color:"white"
  },
  butText:{
    color:'white',
    fontSize:18

  },
  quotes:{
    paddingHorizontal:23,
    fontSize:15
    //color:'#0000FF'
  }
});
