import React from 'react';
import {
  Image, View, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium
} from '@expo-google-fonts/montserrat';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  flexContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 7,
  },
  textContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '30%',
  },
  header: {
    fontSize: 20,
    fontFamily: 'MontserratMedium',
    color: '#1E2021',
    marginBottom: 15,
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: '#1E2021',
    lineHeight: 23,
  },
  infoIconTransparent: {
    marginRight: 15,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

const organizations = [
  {
    title: 'Los Angeles Poverty Department',
    image: require('../assets/orgPics/lapd.png'),
    description: 'Founded in 1985 by director-performer-activist John Malpede, Los Angeles Poverty Department (LAPD)is a non-profit arts organization, the first performance group in the nation made up principally of homeless people, and the first arts program of any kind for homeless people in Los Angeles. LAPD creates performances and multidisciplinary artworks that connect the experience of people living in poverty to the social forces that shape their lives and communities. LAPD’s works express the realities, hopes, dreams and rights of people who live and work in L.A.’s Skid Row.',
    phoneNumber: '(213) 413-1077',
    email: 'info@lapovertydept.org',
    website: 'www.lapovertydept.org',
  },
  {
    title: 'Piece by Piece',
    image: require('../assets/orgPics/piecebypiece.png'),
    description: 'Our mission is to empower residents who have experienced homelessness or economic insecurity by providing free mosaic art workshops enabling them to build confidence, earn supplementary income, promote wellness and an improved quality of life.',
    phoneNumber: '(213) 459-1420',
    email: 'info@piecebypiece.org',
    website: 'https://www.piecebypiece.org',
  },
  {
    title: 'Street Symphony',
    image: require('../assets/orgPics/streetsymphony.png'),
    description: 'Connection through music. Street Symphony engages communities directly affected by homelessness and incarceration in LA County through performances, workshops and teaching artistry.',
    phoneNumber: '(213) 222-6221',
    email: 'contact@streetsymphony.org',
    website: 'www.streetsymphony.org',
  },
  {
    title: 'Urban Voices Project',
    image: require('../assets/orgPics/urbanvoices.png'),
    description: 'Urban Voices Project uses music to create supportive community spaces in Skid Row and the Los Angeles area that bridge vulnerable individuals to a sense of purpose and improved health.',
    phoneNumber: '(714) 606-4818',
    email: 'info@urbanvoicesproject.org',
    website: 'urbanvoicesproject.org',
  },
];

function OrganizationDetailScreen({ route, navigation }) {
  const {
    organization,
  } = route.params || {};

  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: organization });
  }, [navigation, organization]);

  // Find the organization object based on the title
  const selectedOrganization = organizations.find((org) => org.title === organization);

  return (
    <View style={styles.container}>
      <Image
        source={selectedOrganization.image}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.normalText}>
          {' '}
          {selectedOrganization.description}
          {' '}
        </Text>
      </View>
      <Text style={styles.header}>
        Contact Info
      </Text>
      <View style={styles.flexContainer}>
        <Image source={require('../assets/detailScreen/callTransparent.png')} style={styles.infoIconTransparent} />
        <Text style={styles.normalText}>
          {' '}
          {selectedOrganization.phoneNumber}
          {' '}
        </Text>
      </View>
      <View style={styles.flexContainer}>
        <Image source={require('../assets/detailScreen/mailTransparent.png')} style={styles.infoIconTransparent} />
        <Text style={styles.normalText}>
          {' '}
          {selectedOrganization.email}
          {' '}
        </Text>
      </View>
      <View style={styles.flexContainer}>
        <Image source={require('../assets/detailScreen/globeTransparent.png')} style={styles.infoIconTransparent} />
        <Text style={styles.normalText}>
          {' '}
          {selectedOrganization.website}
          {' '}
        </Text>
      </View>
    </View>
  );
}

OrganizationDetailScreen.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
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
