import { React, useState, useEffect } from 'react';
import {
  StyleSheet, ScrollView, View, Text, Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '@env';
import ZineCard from '../Components/ZineCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  fullItem: {
    width: '100%',
    height: 150,
    backgroundColor: 'gray',
    marginBottom: 10,
  },
  rowItem: {
    width: '50%',
    height: 150,
    backgroundColor: 'gray',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  scrollViewContentContainer: {
    paddingBottom: 20, // add some padding to the bottom to prevent the last item from being cut off
  },
  textSection: {
    paddingHorizontal: 10,
  },
  header: {
    padding: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: Dimensions.get('window').height * 0.05,
    fontWeight: 'bold',
    fontFamily: 'MontserratSemiBold',
  },
  secondaryText: {
    fontSize: Dimensions.get('window').height * 0.03,
    fontFamily: 'Montserrat',
  },
  publicationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  bigCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});

function ZinesScreen({ navigation }) {
  const [allZines, setAllZines] = useState([]);
  const getAllZines = async () => {
    try {
      const result = await axios.get(`${URL}/zine/get`);
      setAllZines(result.data);
      return result.data;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getAllZines();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Zines</Text>
        </View>
        <View style={styles.textSection}>
          <Text style={styles.secondaryText}>Publications</Text>
        </View>
        <View style={styles.publicationContainer}>
          {allZines.map((zine) => (
            <View>
              <ZineCard
                navigation={navigation}
                title="The Skid Row Arts Zine"
                season={zine.season}
                year={zine.year}
                url={zine.url}
                contents={zine.contents}
                first={false}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

ZinesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ZinesScreen;
