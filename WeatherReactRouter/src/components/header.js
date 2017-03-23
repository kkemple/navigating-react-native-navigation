import React from 'react'
import { withRouter } from 'react-router-native'
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'

import Icon from './icon'

export default ({ text, onBack }) => (
  <View style={styles.container}>
    {
      onBack
        ? (
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={onBack}>
              <View style={styles.backButton}>
                <Icon name='back' size={30} />
              </View>
            </TouchableOpacity>
          </View>
          )
        : null
    }
    <Text style={styles.title}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#D81B60',
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    paddingBottom: 10,
    flex: 0
  },
  backButtonContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 10
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '300'
  }
})
