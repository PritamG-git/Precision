//import { COLORS, FONTS, SF, SH } from '@/theme';
import { FONTS } from '@/theme/fonts';
import React from 'react';
import Scale, { moderateScale } from '@/helper/Scale';
import { StatusBar, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { BackIcon } from '.';
import { Headerimage, back, logo } from '@/assets';
export function HeaderAuth(props) {
  return (
    <View style={styles.headercontainer}>
      <StatusBar barStyle="dark-content" backgroundColor={'#ffff'} />
      <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
        <View style={styles.backStyleview}>
          <TouchableOpacity style={styles.backStyle} onPress={props.backToScreen}>
            {props.backToScreen && (
              <Image source={back} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{width:'75%'}}>
        <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  headercontainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    paddingLeft: 5,
    paddingTop: 10,
    backgroundColor: '#FFFFFF'
  },
  headerTitle: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: Scale.moderateScale(18),
    color: '#000000',
    paddingLeft:5
  },
  backStyleview:
  {
    flex: 0.5,
  },
  backStyle: {
    width: '55%',
  },
  logo:
  {
    alignSelf: 'center'
  }
});
