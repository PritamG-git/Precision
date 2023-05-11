import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { FONTS } from '../theme/fonts';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(14),
    width: '95%',
    alignSelf: 'center',
    paddingVertical: verticalScale(15)
  },
});

export function Button({ style, textStyle, title, ...rest }) {

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: '#05A1AB' }, style]}
      {...rest}>
      <Text
        style={[
          {
            color: '#FFFFFF',
            fontSize: scale(18),
            fontFamily: FONTS.PoppinsMedium,
          },
          textStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
