import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, TextInput, Image, View} from 'react-native';
import {TextStyles} from '../theme';

const styles = StyleSheet.create({
  input: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E1E1E1',
    borderWidth: 1,
    marginVertical: 15,
    borderRadius: 6,
    paddingVertical: 10,
    paddingLeft: 5,
    height: 56,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
});

export function TextField({style, ...rest}) {
  const {colors} = useTheme();

  return (
    <TextInput
      style={[{color: colors.text}, TextStyles.text, styles.input, style]}
      underlineColorAndroid="transparent"
      {...rest}
    />
  );
}

TextField.propTypes = {
  style: PropTypes.object,
};

TextField.defaultProps = {
  style: null,
};
