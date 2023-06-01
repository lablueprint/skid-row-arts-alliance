import { React } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import Pdf from 'react-native-pdf';

const styles = StyleSheet.create({
  card: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.42,
    height: Dimensions.get('window').height * 0.275,
  },
  borders: {
    backgroundColor: 'transparent',
  },
  bigCard: {
    width: Dimensions.get('window').width,
  },
  pdf: {
    width: Dimensions.get('window').width * 0.42,
    height: Dimensions.get('window').height * 0.3,
    paddingBottom: Dimensions.get('window').height * 0.01,
  },
  bigPdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.5,
  },
  dateText: {
    fontSize: Dimensions.get('window').height * 0.02,
    fontFamily: 'Montserrat',
    marginBottom: Dimensions.get('window').height * 0.01,
  },
  bigText: {
    fontSize: Dimensions.get('window').height * 0.03,
  },
});

function ZineCard({
  title, season, year, url, navigation, contents, first,
}) {
  const source = { uri: url, cache: true };
  const date = `${season} ${year}`;

  return (
    <View>
      <Card
        mode="contained"
        onPress={() => {
          navigation.navigate('Zine Details', {
            title, date, url, contents,
          });
        }}
        contentStyle={[styles.card, first ? styles.bigCard : null]}
        style={styles.borders}
      >
        <Pdf
          source={source}
          singlePage
          style={[styles.pdf, first ? styles.bigPdf : null]}
          backgroundColor="transparent"
        />

      </Card>
      <Text style={[styles.dateText, first ? styles.bigText : null]}>{date}</Text>
    </View>
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
