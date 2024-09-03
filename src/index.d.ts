// src/index.d.ts
import { ViewStyle, TextStyle } from 'react-native';
import React from 'react';

export interface AlertProps {
  message: string;
  onClose?: () => void;
  onOk?: () => void;
  onCancel?: () => void;
  type?: 'info' | 'success' | 'warning' | 'error';
  okText?: string;
  cancelText?: string;
  customStyles?: {
    overlay?: ViewStyle;
    alertContainer?: ViewStyle;
    alertText?: TextStyle;
    buttonContainer?: ViewStyle;
    button?: ViewStyle;
    buttonText?: TextStyle;
    loadingContainer?: ViewStyle;
    loadingLine?: ViewStyle;
  };
}

declare const Alert: React.FC<AlertProps>;
export default Alert;
