import { StyleSheet } from 'react-native';
import { COLOR } from '../../constants/colors/colors';
import Scale, { scale, verticalScale } from '../../helper/Scale';
import { FONTS } from '../../theme/fonts';
export const styles = StyleSheet.create({
  underlineStyleBase: {
    width: scale(50),
    height: scale(60),
    borderWidth: 0,
    borderBottomWidth: scale(2),
    borderBottomColor: '#93AFB1',
    color: COLOR.AppColor,
    fontSize: scale(32),
    paddingVertical: 0,
    marginHorizontal: scale(6),
    fontFamily: FONTS.PoppinsMedium,
  },
  otpOuterView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpStyle: {
    width: '50%',
    height: scale(100),
    alignSelf: 'center',
    alignContent: 'center',
  },
  underlineStyleHighLighted: {
    borderBottomColor: COLOR.AppColor,
  },

  loginContainer: {
    backgroundColor: 'white',
    height: verticalScale(400),
    position: 'absolute',
    bottom: -50,
    width: '100%',
    borderRadius: 50,
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(20),
  },
  formContainer: {
    borderRadius: 5,
    padding: 20,
    width: '100%',
  },
  submitButton: {
    marginTop: 30,
  },
  Title: {
    fontFamily: FONTS.PoppinsSemiBold,
    fontStyle: 'normal',
    fontSize: Scale.moderateScale(32),
    color: '#000000',
    fontWeight: '600',
  },
  TitleDis: {
    fontFamily: FONTS.PoppinsRegular,
    paddingTop: 10,
    fontSize: Scale.moderateScale(14),
    color: '#615B5B',
    fontWeight: '400',
  },
  textTitle: {
    fontFamily: FONTS.PoppinsRegular,
    paddingTop: 10,
    fontSize: Scale.moderateScale(14),
    color: '#313131',
    fontWeight: '400',
  },
  bottomView: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(30),
  },
});
