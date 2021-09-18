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
        flexDirection: 'row',
        padding: normalize(10),
      }}
      onPress={() => {}}>
      <Image
        source={{uri: props.imageUrl}}
        style={{
          width: '35%',
          borderRadius: normalise(10),
          maxHeight: normalise(100),
        }}
        resizeMode="cover"
      />
      <View style={{width: '60%', marginHorizontal: normalize(5)}}>
        <Text
          numberOfLines={readMore ? 10 : 2}
          style={{
            color: props.black,
            textAlign: 'left',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}>
          {props.headline}
        </Text>

        <Text
          numberOfLines={readMore ? 20 : 3}
          style={{
            color: props.black,
            textAlign: 'left',
            marginVertical: normalize(5),
          }}>
          {props.summary}
        </Text>
        {readMore && (
          <Text
            style={{
              marginVertical: normalise(5),
            }}>{` Published: ${moment(props.createdAt).format(
            'DD MMM, YYYY',
          )}`}</Text>
        )}

        <Text onPress={() => setReadMore(!readMore)}>{` ${
          readMore ? '...Read Less' : '...Read More'
        }`}</Text>
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
              position: 'absolute',
              right: 0,
              bottom: 0,
              color: Colors.themeBlue,
            }}>
            visit source ↗️
          </Text>
        </TouchableOpacity>
      </View>
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
  createdAt: PropTypes.string,
  marginVertical: PropTypes.number,
};

NewsItem.defaultProps = {
  height: normalise(100),
  width: '90%',
  borderRadius: normalise(10),
  textColor: Colors.white,
  fontSize: normalise(13),
  headline: '',
  summary: '',
  link: '',
  createdAt: '',
  marginVertical: normalise(20),
};
