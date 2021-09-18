import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Colors} from '../themes/Themes';
import normalise from '../utils/helpers/dimen';
import PropTypes from 'prop-types';

export default function Button(props) {
  function onPress() {
    if (props.onPress) {
      props.onPress();
    }
  }

  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={{
        height: props.height,
        width: props.width,
        borderRadius: props.borderRadius,
        backgroundColor: props.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: props.alignSelf,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        marginHorizontal: props.marginHorizontal,
        //padding: normalise(5),
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        shadowColor: Colors.heading,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
      }}
      onPress={() => {
        onPress();
      }}>
      <Text
        style={{
          color: props.textColor,
          fontSize: props.fontSize,
          marginTop: 0,
          textAlign: 'center',
          fontWeight: '500',
          textTransform: 'uppercase',
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  height: PropTypes.number,
  width: PropTypes.any,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  textColor: PropTypes.string,
  fontSize: PropTypes.number,
  title: PropTypes.string,
  onPress: PropTypes.func,
  alignSelf: PropTypes.string,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  marginHorizontal: PropTypes.number,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,
  textMarginTop: PropTypes.number,
  fontWeight: PropTypes.string,

  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
};

Button.defaultProps = {
  height: normalise(40),
  backgroundColor: Colors.heading,
  borderRadius: normalise(20),
  textColor: Colors.white,
  fontSize: normalise(13),
  title: '',
  onPress: null,
  alignSelf: null,
  marginTop: 0,
  marginBottom: 0,
  marginHorizontal: 0,
  textColor: Colors.black,
  disabled: false,
  textMarginTop: 0,
  fontWeight: 'bold',

  borderColor: Colors.green,
  borderWidth: 0,
};
