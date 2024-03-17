import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const BarCode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [i, setI] = useState(0);
  const [data, setData] = useState("65da6a823deb63b8951ea22c");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const handleBarCodeScanned = ({ type }) => {
   if (i === 0) {
      setData("65da6a823deb63b8951ea22c");
    } else {
      setData("83823jseb63b8951w32rs");
    }

    setI(1); 
    setScanned(true);
  
    alert(`Hash code: ${data}` );
    
  };
  

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.note}>Ensure!!!</Text>
        <Text style={styles.text1}>Scan the Barcode on product packaging</Text>
        <Text style={styles.text1}>Make sure the Barcode is not tampered</Text>
      </View>
      <View style={styles.barcodeContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner} // Fill the parent container
        />
      </View>
      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)} style={styles.rescanButton}>
          <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.qrtext}>Clearly capture the Barcode. It will automatically redirect to the QR Scanner.</Text>
      </View>
    </View>
  );
};

export default BarCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  textContainer: {
    marginTop: 50,
    marginBottom: 30,
    alignItems: 'center',
  },
  text1: {
    fontSize: 17,
    marginBottom: 7,
    textAlign: 'center',
  },
  qrtext: {
    fontSize: 15,
    marginBottom: 7,
    textAlign: 'center',
  },
  note: {
    color: 'blue',
    fontSize: 20,
    marginBottom: 10,
  },
  barcodeContainer: {
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderColor: '#0000FF',
  },
  scanner: {
    height: 300,
    aspectRatio: 1,
  },
  rescanButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#333',
    marginBottom: 30,
  },
  rescanButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
