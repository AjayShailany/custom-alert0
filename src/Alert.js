import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";

const Alert = ({
  message,
  onClose,
  onOk,
  onCancel,
  type = "info",
  okText = "OK",
  cancelText = "Cancel",
  customStyles = {},
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const [loading, setLoading] = useState(false);
  const [loadingLineWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();

    if (onClose) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [onClose, fadeAnim, scaleAnim]);

  const startLoadingLineAnimation = (callback) => {
    Animated.timing(loadingLineWidth, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      setLoading(false);
      if (callback) callback();
    });
  };

  const handleOkPress = () => {
    setLoading(true);
    startLoadingLineAnimation(onOk);
  };

  const handleCancelPress = () => {
    if (onCancel) onCancel();
    setLoading(false);
  };

  return (
    <Modal transparent={true} animationType="none" visible={true}>
      <View style={[styles.overlay, customStyles.overlay]}>
        <Animated.View
          style={[
            styles.alertContainer,
            styles[`alert${type.charAt(0).toUpperCase() + type.slice(1)}`],
            customStyles.alertContainer,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={[styles.alertText, customStyles.alertText]}>
            {message}
          </Text>
          <View style={[styles.buttonContainer, customStyles.buttonContainer]}>
            <TouchableOpacity
              style={[styles.button, customStyles.button]}
              onPress={handleOkPress}
              disabled={loading}
            >
              <Text style={[styles.buttonText, customStyles.buttonText]}>
                {okText}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, customStyles.button]}
              onPress={handleCancelPress}
              disabled={loading}
            >
              <Text style={[styles.buttonText, customStyles.buttonText]}>
                {cancelText}
              </Text>
            </TouchableOpacity>
          </View>
          {loading && (
            <View
              style={[styles.loadingContainer, customStyles.loadingContainer]}
            >
              <Animated.View
                style={[
                  styles.loadingLine,
                  customStyles.loadingLine,
                  {
                    width: loadingLineWidth.interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  alertText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  alertInfo: { backgroundColor: "#f1f1f1" },
  alertSuccess: { backgroundColor: "#e1f5e1" },
  alertWarning: { backgroundColor: "#fff4e1" },
  alertError: { backgroundColor: "#f8d7da" },
  loadingContainer: {
    width: "100%",
    height: 4,
    marginTop: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 2,
    overflow: "hidden",
  },
  loadingLine: {
    height: "100%",
    backgroundColor: "#007bff",
  },
});

export default Alert;
