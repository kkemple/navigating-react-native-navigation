import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

export default (
  { style, buttons, onChangeIndex, activeColor, inactiveColor, activeIndex },
) => (
  <View style={[styles.container, style]}>
    {buttons.map((button, index) => (
      <View
        key={index}
        style={[
          styles.button,
          {
            backgroundColor: activeIndex === index
              ? activeColor
              : inactiveColor,
          },
        ]}
      >
        <TouchableOpacity onPress={() => onChangeIndex(index)}>
          <Text style={styles.buttonText}>{button.text.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    flex: 0,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    padding: 15,
    flex: 1,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '300',
    textAlign: 'center',
  },
});
