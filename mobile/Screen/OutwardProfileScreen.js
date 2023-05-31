import React, { useState, useEffect } from 'react';
import { URL } from '@env';
import axios from 'axios';
import {
  StyleSheet, Text, TextInput, View, Button, Image, ScrollView, ImageBackground, Pressable, TouchableOpacity, Card
} from 'react-native';
import {
  useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_500Medium,
} from '@expo-google-fonts/montserrat';
import ArtworkCard from '../Components/ArtworkCard';

const cardGap = 15;

const cardWidth = 150;

const styles = StyleSheet.create({
  backArrow: {
    height: '3%',
    width: '3.3%',
    marginTop: '13%',
    marginLeft: '4.5%',
  },
  nameText: {
    fontFamily: 'MontserratMedium',
    fontSize: 24,
    lineHeight: 24,
    marginLeft: '5%',
    marginTop: '5.5%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  column: {
    flex: 1,
    // borderWidth: 1,
    maxWidth: '38%',
    maxHeight: '100%',
    marginTop: '6%',
  },
  rightColumn: {
    flex: 1,
    // borderWidth: 1,
    maxHeight: '33%', // changes row size
    marginTop: '8%',
  },
  row: {
    flex: 1,
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    // borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: '15%',
  },
  avatar: {
    height: '39.3%',
    width: '89%',
    marginLeft: 26,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    // borderWidth: 3,
    // borderColor: '#000000',
  },
  socialMediaLogo: {
    // width: '25%',
    // height: '100%',
    width: '9%',
    height: '5%',
    marginRight: 10,
    overflow: 'visible',
    alignSelf: 'center',
  },
  socialText: {
    fontFamily: 'Montserrat',
    fontSize: 15,
  },
  bioText: {
    fontFamily: 'Montserrat',
    fontSize: 15,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '-43%',
    lineHeight: 20,
  },
  artHeader: {
    width: '100%',
    flexDirection: 'row',
    marginTop: '7%',
    backgroundColor: 'white',
  },
  artNameText: {
    fontFamily: 'MontserratMedium',
    fontSize: 24,
    lineHeight: 24,
    marginLeft: '5%',
  },
  seeMoreButton: {
    alignSelf: 'bottom',
    justifyContent: 'flex-end',
    flex: 3,
  },
  seeMoreText: {
    color: '#4C4C9B',
    textAlign: 'bottom',
    paddingTop: 2,
    paddingLeft: 170,
    fontFamily: 'MontserratSemiBold',
    fontSize: 15,
  },
  seeMoreArrow: {
    width: '2%',
    height: '2%',
    marginRight: '5%',
    overflow: 'visible',
    alignSelf: 'center',
  },
  artContainer: {
    marginLeft: '5%',
    marginRight: '5%',
    flexDirection: 'row',
    backgroundColor: 'white',
    // paddingBottom: 120,
    marginTop: '5%',
  },
  artworkCard: {
    width: 200,
    height: 200,
  },
  artContainer2: {
    marginLeft: '5%',
    marginRight: '5%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 20,
    paddingBottom: 150,
  },
});

function OutwardProfileScreen({
  navigation,
}) {
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });
  const [user, setUser] = useState({});

  const getUserData = async () => {
    try {
      const res = await axios.get(`${URL}/user/getUser/6458b293755a8dbbf4d9a6a9`);
      setUser(res.data.msg);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  console.log(1, user);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={{backgroundColor: 'white'}}>
      <Image
        source={require('../assets/backArrowHD.png')}
        style={styles.backArrow}
      />
      <Text style={styles.nameText}>{user.firstName} {user.lastName}</Text>
      <View style={styles.container}>
        <View style={styles.column}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/1454769/pexels-photo-1454769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
            resizeMode="cover"
            style={styles.avatar}
          />
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.row}>
            <View style={{ flex: 0, flexDirection: 'row' }}>
              <Image
                source={require('../assets/facebook.png')}
                style={styles.socialMediaLogo}
              />
              <Text style={styles.socialText}>Juliet Zhang</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ flex: 0, flexDirection: 'row' }}>
              <Image
                source={require('../assets/instagram.png')}
                style={styles.socialMediaLogo}
              />
              <Text style={styles.socialText}>@juliet_zha</Text>
            </View>
          </View>
          <View style={styles.row}>
          <View style={{ flex: 0, flexDirection: 'row' }}>
            <Image
              source={require('../assets/twitter.png')}
              style={styles.socialMediaLogo}
            />
            <Text style={styles.socialText}>@juliet_zha</Text>
          </View>
          </View>
        </View>
      </View>
      <Text style={styles.bioText}>{user.bio}</Text>
      <View style={styles.artHeader}>
        <Text style={styles.artNameText}>{user.firstName}'s Art</Text>
        <Pressable style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>See More</Text>
        </Pressable>
        <Image
          source={require('../assets/arrow_forward_ios.png')}
          style={styles.seeMoreArrow}
        />
      </View>
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.artContainer}>
          <ArtworkCard
            ImageURL='https://tinybeans.com/wp-content/uploads/2016/08/starry-night-van-gogh.jpg?w=605'
            navigation={navigation}
            style={styles.artworkCard}
          />
          <ArtworkCard
            ImageURL='https://i.pinimg.com/736x/4a/b9/dd/4ab9dd0f073b6e20d737b85861f7e15c.jpg'
            navigation={navigation}
            style={styles.artworkCard}
          />
        </View>
        <View style={styles.artContainer2}>
          <ArtworkCard
            ImageURL='https://images.saatchiart.com/saatchi/1081581/art/8655730/7719361-HSC00001-7.jpg'
            navigation={navigation}
            style={styles.artworkCard}
          />
          <ArtworkCard
            ImageURL='https://wallpapercave.com/wp/wp3564248.jpg'
            navigation={navigation}
            style={styles.artworkCard}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default OutwardProfileScreen;
