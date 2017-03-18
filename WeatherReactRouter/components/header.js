import React from 'react'
import { withRouter } from 'react-router-native'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'

import backButton from '../assets/back-button.png'

export default ({ text, onBack }) => (
  <View style={styles.container}>
    {
      onBack
        ? (
            <View style={styles.backButton}>
              <TouchableOpacity onPress={onBack}>
                <Image style={styles.image} source={backButton} />
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
    paddingTop: 30,
    paddingBottom: 10,
    flex: 0
  },
  backButton: {
    position: 'absolute',
    bottom: 9,
    left: 8
  },
  image: {
    width: 20,
    height: 20
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '300'
  }
})
