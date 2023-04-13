import {
  React,
} from 'react';
import {
  StyleSheet, Dimensions,
} from 'react-native';
import {
  Card, Title, Text, Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import Pdf from 'react-native-pdf';

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').height * 0.5,
  },
});

function ZineCard({
  title, season, year, url, navigation, contents,
}) {
  const source = { uri: url, cache: true };
  const date = `${season} ${year}`;
  return (
    <Card>
      <Card.Content>
        <Title>{title}</Title>
        <Text>{date}</Text>
      </Card.Content>
      <Button
        title="Details"
        onPress={() => {
          navigation.navigate('Zine Details', {
            title, date, url, contents,
          });
        }}
      />
      <Pdf
        source={source}
        singlePage
        style={styles.pdf}
      />
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
};

export default ZineCard;
