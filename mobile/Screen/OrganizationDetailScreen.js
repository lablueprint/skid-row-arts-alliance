import React from 'react';
import {
  Image, View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium
} from '@expo-google-fonts/montserrat';

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 500,
    height: 200,
  },
  title: {
    fontFamily: 'MontserratMedium',
    fontSize: 24,
  },
  header: {
    fontSize: 24,
    fontFamily: 'MontserratMedium',
    color: '#1E2021',
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'MontserratMedium',
    color: '#1E2021',
    lineHeight: 23,
  },
  infoIconTransparent: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

function OrganizationDetailScreen({ route }) {
  const {
    image, organization, organizationDescription, phoneNumber, email, website,
  } = route.params || {};

  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
  });

  const imageURL = image.uri;

  return (
    <View>
      <Text style={styles.title}>{organization}</Text>
      <Image source={require('../assets/detailScreen/laPoverty.png')} style={styles.image}/>
      <Text style={styles.normalText}>
        {' '}
        {organizationDescription}
        {' '}
      </Text>
      <Text style={styles.header}>
        Contact Info
      </Text>
      <View style={styles.flexContainer}>
      <Image source={require('../assets/detailScreen/callTransparent.png')} style={styles.infoIconTransparent} />
      <Text style={styles.normalText}>
        {' '}
        {phoneNumber}
        {' '}
      </Text>
      </View>
      <View style={styles.flexContainer}>
      <Image source={require('../assets/detailScreen/mailTransparent.png')} style={styles.infoIconTransparent} />
      <Text style={styles.normalText}>
        {' '}
        studio526@gmail.com
        {' '}
      </Text>
      </View>
      <View style={styles.flexContainer}>
      <Image source={require('../assets/detailScreen/globeTransparent.png')} style={styles.infoIconTransparent} />
      <Text style={styles.normalText}>
        {' '}
        {website}
        {' '}
      </Text>
      </View>
    </View>
  );
}

OrganizationDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      organization: PropTypes.string.isRequired,
      organizationDescription: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default OrganizationDetailScreen;
