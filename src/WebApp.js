import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from './styles/colors';
import { translations } from './utils/translations';

/**
 * Web-only app implementation that shows a notice to use the mobile app
 * This avoids importing any native-only modules that would cause errors on web
 */
const WebApp = () => {
  return (
    <View style={styles.webContainer}>
      <View style={styles.webContent}>
        <Text style={styles.webTitle}>{translations.webAppTitle}</Text>
        <Text style={styles.webMessage}>
          {translations.webAppMessage}
        </Text>
        
        <View style={styles.qrContainer}>
          <Text style={styles.qrLabel}>{translations.scanQrCode}</Text>
          {/* Replace this with an actual QR code in production */}
          <View style={styles.qrCodePlaceholder}>
            <Text style={styles.qrPlaceholderText}>QR Code</Text>
          </View>
        </View>
        
        <Text style={styles.webFooter}>
          {translations.webAppFooter}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  webContent: {
    maxWidth: 600,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 30,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center'
  },
  webTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 15,
    textAlign: 'center'
  },
  webMessage: {
    fontSize: 18,
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26
  },
  qrContainer: {
    marginBottom: 30,
    alignItems: 'center'
  },
  qrLabel: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: 15
  },
  qrCodePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  qrPlaceholderText: {
    color: COLORS.grey
  },
  webFooter: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: 'center',
    fontStyle: 'italic'
  }
});

export default WebApp;