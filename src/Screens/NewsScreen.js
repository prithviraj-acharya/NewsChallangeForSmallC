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

import MyStatusBar from '../utils/helpers/MyStatusBar';
import normalize from '../utils/helpers/dimen';
import {Colors} from '../themes/Themes';
import {useDispatch, useSelector} from 'react-redux';
import {getNewsRequestAction} from '../redux/action/AuthAction';
import NewsItem from '../components/NewsItem';
import NewsItemGridView from '../components/NewsItemGridView';
import status from '../utils/helpers/status.js';
import {GET_NEWS_REQUEST} from '../redux/store/TypeConstants';

export default function AddEditElements(props) {
  const [onScrolled, setOnScrolled] = useState(false);
  const [listSelected, setListSelected] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);

  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  useEffect(() => {
    dispatch(getNewsRequestAction({pageNumber: AuthReducer.pageNumber}));
  }, []);

  function renderNewsItem(data) {
    let {imageUrl, headline, summary, link, createdAt} = data.item;

    return (
      <NewsItem
        imageUrl={imageUrl}
        headline={headline}
        summary={summary}
        link={link}
        createdAt={createdAt}
      />
    );
  }

  function renderGridNewsItem(data) {
    let {imageUrl, headline, summary, link, createdAt} = data.item;

    return (
      <NewsItemGridView
        imageUrl={imageUrl}
        headline={headline}
        summary={summary}
        link={link}
        createdAt={createdAt}
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
        barStyle={'light-content'}
        backgroundColor={Colors.themeBlue}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.themeBlue}}>
        <Text style={styles.headerText}>SMALLCASE - NEWS 📰</Text>

        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              setListSelected(true);
            }}
            style={
              listSelected ? styles.activeBackgound : styles.inactiveBackgound
            }>
            <Text style={listSelected ? styles.aciveText : styles.inaciveText}>
              LIST VIEW
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setListSelected(false);
            }}
            style={
              listSelected ? styles.inactiveBackgound : styles.activeBackgound
            }>
            <Text style={listSelected ? styles.inaciveText : styles.aciveText}>
              GRID VIEW
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            flex: 1,
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: listSelected ? '0%' : '-100%',
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{
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
          </View>
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: !listSelected ? '0%' : '-100%',
            }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={2}
              style={{
                height: '90%',
              }}
              contentContainerStyle={{justifyContent: 'space-around'}}
              data={AuthReducer.newsData}
              renderItem={renderGridNewsItem}
              scrollEnabled={() => {
                props.totalPageCount >= offset ? true : false;
              }}
              windowSize={10}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalVerticalIndicator={false}
              onEndReached={() => {
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
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: normalize(200),
    height: normalize(30),
    borderColor: Colors.white,
    borderWidth: normalize(1),
    borderRadius: normalize(5),
    alignSelf: 'center',
    marginVertical: normalize(15),
  },
  headerText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: normalize(15),
    textAlign: 'center',
    marginTop: normalize(15),
  },
  activeBackgound: {
    width: '50%',
    backgroundColor: Colors.white,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aciveText: {
    color: Colors.themeBlue,
  },
  inactiveBackgound: {
    width: '50%',
    backgroundColor: Colors.themeBlue,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
    borderWidth: normalize(1),
  },
  inaciveText: {
    color: Colors.white,
  },
});
