import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import MyStatusBar from '../../utils/helpers/MyStatusBar';
import normalize from '../../utils/helpers/dimen';
import {Colors} from '../../themes/Themes';
import {useDispatch, useSelector} from 'react-redux';
import {getNewsRequestAction} from '../../redux/action/AuthAction';
import NewsItem from '../../components/NewsItem';
import status from '../../utils/helpers/status.js';
import {GET_NEWS_REQUEST} from '../../redux/store/TypeConstants';

export default function AddEditElements(props) {
  const [onScrolled, setOnScrolled] = useState(false);

  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  useEffect(() => {
    dispatch(getNewsRequestAction({pageNumber: AuthReducer.pageNumber}));
  }, []);

  function renderNewsItem(data) {
    let {imageUrl, headline, summary, link} = data.item;

    return (
      <NewsItem
        imageUrl={imageUrl}
        headline={headline}
        summary={summary}
        link={link}
      />
    );
  }

  BottomView = () => {
    return (
      <View>
        {AuthReducer.loading && (
          <ActivityIndicator
            color={Colors.white}
            size="large"
            style={{marginLeft: 6, marginBottom: 150, marginTop: 10}}
          />
        )}
      </View>
    );
  };

  status(
    AuthReducer.status,
    GET_NEWS_REQUEST,
    () => {
      setOnScrolled(false);
    },
    () => {},
  );

  return (
    <>
      <MyStatusBar
        barStyle={'dark-content'}
        backgroundColor={Colors.themeBlue}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.themeBlue}}>
        <Text style={styles.headerText}>NEWS OF THE DAY 📰</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: normalize(20),
            height: '90%',
          }}
          data={AuthReducer.newsData}
          renderItem={renderNewsItem}
          scrollEnabled={() => {
            props.totalPageCount >= offset ? true : false;
          }}
          windowSize={10}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalVerticalIndicator={false}
          onEndReached={() => {
            console.log('OnEndReached: ' + onScrolled);

            if (onScrolled) {
              if (AuthReducer.newDataAvailable) {
                dispatch(
                  getNewsRequestAction({
                    pageNumber: AuthReducer.pageNumber + 1,
                  }),
                );
              }
            }
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => setOnScrolled(true)}
          ListFooterComponent={BottomView}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    padding: normalize(15),
    paddingBottom: normalize(5),
    display: 'flex',
    borderRadius: normalize(15),
    width: '45%',
    height: normalize(170),
    marginVertical: '2%',
  },
  headerText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: normalize(15),
    textAlign: 'center',
    marginTop: normalize(15),
  },
});
