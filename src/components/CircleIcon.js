import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../constants/colors/colors';
import {scale, verticalScale} from '../helper/Scale';
import {FONTS} from '../theme/fonts';

const styles = StyleSheet.create({
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLOR.AppColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function CircleIcon({
  circleStyle,
  iconName,
  iconColor,
  iconSize,
  ...rest
}) {
  return (
    <TouchableOpacity style={[styles.button, circleStyle]} {...rest}>
      <Icon name={iconName} color={iconColor} size={iconSize} />
    </TouchableOpacity>
  );
}

CircleIcon.propTypes = {
  circleStyle: PropTypes.object,
  iconName: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
};

CircleIcon.defaultProps = {
  circleStyle: null,
  iconName: null,
  iconColor: COLOR.white,
  iconSize: 15,
};
