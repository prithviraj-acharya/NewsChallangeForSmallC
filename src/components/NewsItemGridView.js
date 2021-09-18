import React, {useState} from 'react';
import {View, Text, Image, Linking, TouchableOpacity} from 'react-native';
import {Colors} from '../themes/Themes';
import normalise from '../utils/helpers/dimen';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function NewsItem(props) {
  const [readMore, setReadMore] = useState(false);

  return (
    <View
      activeOpacity={0.8}
      style={{
        minHeight: props.height,
        width: props.width,
        borderRadius: props.borderRadius,
        backgroundColor: Colors.white,
        alignSelf: 'center',
        shadowColor: Colors.black,
        marginVertical: normalise(10),
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        padding: normalize(5),
        marginStart: normalize(10),
      }}
      onPress={() => {}}>
      <Image
        source={{uri: props.imageUrl}}
        style={{
          height: normalise(130),
          borderRadius: normalise(10),
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          marginVertical: normalise(5),
          textAlign: 'center',
          fontWeight: 'bold',
        }}>{` Published: ${moment(props.createdAt).format(
        'DD MMM, YYYY',
      )}`}</Text>
      <TouchableOpacity
        onPress={async () => {
          const supported = await Linking.canOpenURL(props.link);
          if (supported) {
            await Linking.openURL(props.link);
          } else {
            showErrorAlert('The PDF document is not valid!');
          }
        }}>
        <Text
          style={{
            color: Colors.themeBlue,
            textAlign: 'center',
          }}>
          visit source ↗️
        </Text>
      </TouchableOpacity>
    </View>
  );
}

NewsItem.propTypes = {
  height: PropTypes.number,
  width: PropTypes.any,
  borderRadius: PropTypes.number,
  textColor: PropTypes.any,
  fontSize: PropTypes.number,
  headline: PropTypes.string,
  summary: PropTypes.string,
  link: PropTypes.string,
  marginVertical: PropTypes.number,
};

NewsItem.defaultProps = {
  height: normalise(180),
  width: '45%',
  borderRadius: normalise(10),
  textColor: Colors.white,
  fontSize: normalise(13),
  headline: '',
  summary: '',
  link: '',
  marginVertical: normalise(20),
};
