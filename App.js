import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not Yet Scanned");
    const [totalScan, setTotalScan] = useState(0);

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted');
        })()
    };

    useEffect(() => {
        askForCameraPermission();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
        setTotalScan((totalScan) => totalScan + 1);
        console.log(`Type: ${type}, Data: ${data}`);

        setTimeout(() => {
            setScanned(false);
        }, 5000);
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting For Camera Permission</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 15 }}>No Access To Camera !</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Scanner" component={ScanScreen} options={{
                    title: "QR Code Scanner",
                    headerStyle: {
                        backgroundColor: "#3474fb",
                    },
                    headerTintColor: "white"
                }} />
                <Stack.Screen name="ScannedDataScreen" component={ScannedDataScreen} options={{
                    title: "Product Details",
                    headerStyle: {
                        backgroundColor: "#3474fb",
                    },
                    headerTintColor: "white"
                }} />
            </Stack.Navigator>
            <StatusBar style="light" backgroundColor={"#3474fb"} />
        </NavigationContainer>
    );
}

function ScanScreen({ navigation }) {
    const [scanned, setScanned] = useState(false);
    const [totalScan, setTotalScan] = useState(0);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setTotalScan((totalScan) => totalScan + 1);
        console.log(`Type: ${type}, Data: ${data}`);

        navigation.navigate('ScannedDataScreen', { scannedData: data });
    };

    return (
        <View style={styles.container}>
            <Image source={require("./assets/traz_logo.png")} style={{ width: 250, height: 80, marginBottom: 15 }} />
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400 }}
                />
            </View>
            <Text style={{ fontSize: 22, margin: 25, textAlign: 'center' }}>Scan the QR on Product</Text>

            {scanned && <Button title={'Scan Again ?'} onPress={() => setScanned(false)} color='tomato' />}
        </View>
    );
}

const Card = ({ RMSid, DISId, MANid, RETid }) => {
  return (
      <View style={styles.card}>
          <Text style={styles.field}>RMSid: {RMSid}</Text>
          <Text style={styles.field}>DISId: {DISId}</Text>
          <Text style={styles.field}>MANid: {MANid}</Text>
          <Text style={styles.field}>RETid: {RETid}</Text>
      </View>
  );
};
function ScannedDataScreen({ route }) {
  const { scannedData } = route.params;
  const [productInfo, setProductInfo] = useState(null);
  const [stages, setStages] = useState(0);

  useEffect(() => {
      const apiUrl = `https://mongodb-api-production-2b24.up.railway.app/product/${scannedData}`;
      fetch(apiUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              setProductInfo(data);
          })
          .catch(error => {
              console.error('Error fetching product data:', error);
          });
  }, []); 

  return (
      <View style={styles.scancontainer}>
          <Text style={styles.scanheader}>Product ID:</Text>
          <Text>{scannedData}</Text>
          {productInfo && (
              <View style={styles.scancontainer}>
                  <Text style={styles.scanheader}>Product Name:</Text>
                  <Text>{productInfo["name"]}</Text>
                  <Text style={styles.scanheader}>Product Description:</Text>
                  <Text>{productInfo["description"]}</Text>
                  <Text style={styles.scanheader}>Product Current Stage:</Text>
                  <Text>{productInfo["stage"]}</Text>
                  <Text style={styles.scanheader}>Raw Material Supplier:</Text>
                  <Text>{productInfo["RMSid"] === 0 ? "NA" : "Raw Material Supplied"}</Text>
                  <Text style={styles.scanheader}>Manufacturer:</Text>
                  <Text>{productInfo["MANid"] === 0 ? "NA" : "Product Manufactured"}</Text>
                  <Text style={styles.scanheader}>Distributor:</Text>
                  <Text>{productInfo["DISid"] === 0 ? "NA" : "Product DIstributed"}</Text>
                  <Text style={styles.scanheader}>Retailer:</Text>
                  <Text>{productInfo["RETid"] === 0 ? "NA" : "Prodcut Retailed"}</Text>
                  <Text style={styles.scanheader}>Product Hash:</Text>
                  <Text>{productInfo["_id"]}</Text>
              </View>
          )}
      </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    barcodebox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 340,
        width: 340,
        overflow: 'hidden'
    },
    scancontainer: {
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10
    },
    scanheader: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});