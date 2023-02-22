// component that renders artwork cards on gallery screen
import * as React from 'react';
import {
  Image, TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';

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
      <Card onPress={onPressEvent}>
        <Image // works with card.cover as well
          style={{ height: 250, width: 250 }}
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
