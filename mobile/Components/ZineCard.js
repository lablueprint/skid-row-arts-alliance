import * as React from 'react';
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

function ZineCard({
  title, date, url, navigation,
}) {
  const source = { uri: url, cache: true };
  return (
    <Card>
      <Card.Content>
        <Title>{title}</Title>
        <Text>{date}</Text>
      </Card.Content>
      <Button
        title="Details"
        onPress={() => {
          navigation.navigate('Zine Details', { title, date, url });
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
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ZineCard;
