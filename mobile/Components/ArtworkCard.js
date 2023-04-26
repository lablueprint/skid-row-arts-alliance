// component that renders artwork cards on gallery screen
import * as React from 'react';
import {
  Dimensions, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';

const cardWidth = (Dimensions.get('window').width / 2) - 6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 0,
    margin: 3,
  },
});

function ArtworkCard({
  ImageURL, id, navigation,
}) {
  const onPressEvent = () => {
    navigation.navigate('Artwork Details', {
      id,
    });
  };

  return (
    <TouchableOpacity>
      <Card style={styles.container} onPress={onPressEvent}>
        <Image // works with card.cover as well
          style={{ height: cardWidth, width: cardWidth }}
          source={{ uri: ImageURL }}
        />
      </Card>
    </TouchableOpacity>
  );
}

ArtworkCard.propTypes = {
  ImageURL: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ArtworkCard;
