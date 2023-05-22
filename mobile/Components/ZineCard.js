import { React } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import {
  Card, Title, Text, Button, TouchableOpacity,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Pdf from 'react-native-pdf';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    alignItems: 'flex-start',
    marginVertical: 10,
    width: Dimensions.get('window').width * 0.42,
    margin: 10,
  },
  bigCard: {
    width: Dimensions.get('window').width * 0.9,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width * 0.37,
    height: Dimensions.get('window').height * 0.25,
    paddingBottom: 10,
  },
  bigPdf: {
    width: Dimensions.get('window').width * 0.83,
    height: Dimensions.get('window').height * 0.55,
  },
  dateText: {
    fontSize: 15,
  },
  bigText: {
    fontSize: 20,
  },
});

function ZineCard({
  title, season, year, url, navigation, contents, first,
}) {
  const source = { uri: url, cache: true };
  const date = `${season} ${year}`;
  return (
    <Card
      style={[styles.card, first ? styles.bigCard : null]}
      onPress={() => {
        navigation.navigate('Zine Details', {
          title, date, url, contents,
        });
      }}
    >
      <Pdf
        source={source}
        singlePage
        style={[styles.pdf, first ? styles.bigPdf : null]}
      />
      <Text style={[styles.dateText, first ? styles.bigText : null]}>{date}</Text>
    </Card>
  );
}

ZineCard.propTypes = {
  title: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      sectionTitle: PropTypes.string.isRequired,
      sectionPage: PropTypes.number.isRequired,
    }),
  ).isRequired,
  first: PropTypes.bool.isRequired,
};

export default ZineCard;
