##CustomAlert Package for React Native

A customizable and animated alert package for React Native, offering various alert types, flexible button configurations, and support for custom styles.

## Description

CustomAlert is an npm package designed for React Native applications, allowing developers to easily implement highly customizable and animated alert dialogs. This package supports different alert types (info, success, warning, error), loading animations, and button configurations. It also provides the flexibility to override styles, making it suitable for a wide range of mobile applications where user notifications are needed.

## Installation

To install the `CustomAlert` component, you can use npm or yarn:

npm install custom-alert0

yarn install custom-alert0


and import 

import CustomAlert from 'custom-alert0'; 



Here's a basic example of how to integrate the CustomAlert component into your React Native project:






import React, { useState } from 'react';
import { View, Button } from 'react-native';
import CustomAlert from 'custom-alert0';

const App = () => {
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = () => setAlertVisible(true);

  const handleAlertClose = () => setAlertVisible(false);

  return (
    <View>
      <Button title="Show Alert" onPress={showAlert} />
      {alertVisible && (
        <CustomAlert
          heading="Attention"
          message="This is an important message."
          onClose={handleAlertClose}
          buttons={[
            { text: "Cancel", onPress: handleAlertClose },
            { text: "Confirm", onPress: () => console.log("Confirmed") }
          ]}
          type="warning"
          customStyles={{
            alertContainer: { backgroundColor: '#f8d7da' },
            heading: { color: '#721c24' },
            message: { color: '#721c24' },
            buttonContainer: { justifyContent: 'space-between' },
            button: { backgroundColor: '#007bff' },
            buttonText: { color: 'white' },
            loadingLine: { backgroundColor: '#ff0000' },
          }}
        />
      )}
    </View>
  );
};

export default App;







https://github.com/user-attachments/assets/6b1f3c95-cd45-4fb2-b151-1966ceedc73d




```bash






