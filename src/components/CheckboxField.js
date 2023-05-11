import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
//import { COLORS } from '@/constants';
import { TextStyles } from '@/theme';

const Styles = StyleSheet.create({
  textStyle: {
    ...TextStyles.boldtext,
    fontSize: 16,
    textAlignVertical: 'center',
  },

  checkFieldWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export function CheckboxField({
  textStyle,
  chkTitle,
  isSquare,
  isChecked,
  ...rest
}) {
  return (
    <View style={Styles.checkFieldWrap}>
      {/* {isSquare && (
        <Checkbox
          status={isChecked ? 'checked' : 'unchecked'}
          color={'red'}
          {...rest}
        />
      )}
      {!isSquare && (
        <RadioButton.Android
          value=""
          color={'black'}
          status={isChecked ? 'checked' : 'unchecked'}
          {...rest}
        />
      )}

      {React.isValidElement(chkTitle)
        ? chkTitle
        : chkTitle !== '' &&
          chkTitle && (
            <Text style={textStyle || Styles.textStyle}>{chkTitle}</Text>
          )} */}
    </View>
  );
}

CheckboxField.propTypes = {
  textStyle: PropTypes.object,
  chkTitle: PropTypes.any,
  isSquare: PropTypes.bool,
  isChecked: PropTypes.bool,
};

CheckboxField.defaultProps = {
  style: null,
  textStyle: null,
  isSquare: true,
};
