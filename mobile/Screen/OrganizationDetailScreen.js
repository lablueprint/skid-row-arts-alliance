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

function OrganizationDetailScreen({ route, navigation }) {
  const {
    selectedOrganization,
  } = route.params || {};

  const orgImages = {
    'Los Angeles Poverty Department': require('../assets/orgPics/lapd.png'),
    'Piece by Piece': require('../assets/orgPics/piecebypiece.png'),
    'Street Symphony': require('../assets/orgPics/streetsymphony.png'),
    'Urban Voices Project': require('../assets/orgPics/urbanvoices.png'),
  };

  const orgImage = orgImages[selectedOrganization.organizationTitle]

  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: selectedOrganization.organizationTitle });
  }, [navigation, selectedOrganization.organizationTitle]);

  return (
    <View style={styles.container}>
      <Image
        source={orgImage}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.normalText}>
          {selectedOrganization.description}
        </Text>
      </View>
      <Text style={styles.header}>
        Contact Info
      </Text>
      <View style={styles.flexContainer}>
        <Image source={require('../assets/detailScreen/callTransparent.png')} style={styles.infoIconTransparent} />
        <Text style={styles.normalText}>
          {selectedOrganization.phoneNumber}
        </Text>
      </View>
      <View style={styles.flexContainer}>
        <Image source={require('../assets/detailScreen/mailTransparent.png')} style={styles.infoIconTransparent} />
        <Text style={styles.normalText}>
          {selectedOrganization.email}
        </Text>
      </View>
      <View style={styles.flexContainer}>
        <Image source={require('../assets/detailScreen/globeTransparent.png')} style={styles.infoIconTransparent} />
        <Text style={styles.normalText}>
          {selectedOrganization.website}
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
      selectedOrganization: PropTypes.shape,
    }),
  }).isRequired,
};

export default OrganizationDetailScreen;
