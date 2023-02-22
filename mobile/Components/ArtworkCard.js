// component that renders artwork cards on gallery screen
import * as React from 'react';
import {
  Image, TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';

function ArtworkCard({
  title, Encoding, name, description, email, navigation,
}) {
  const onPressEvent = () => {
    navigation.navigate('Artwork Details', {
      title,
      Encoding,
      name,
      description,
      email,
    });
  };

  return (
    <TouchableOpacity>
      <Card onPress={onPressEvent}>
        <Image // works with card.cover as well
          style={{ height: 250, width: 250 }}
          source={{ uri: Encoding }}
        />
      </Card>
    </TouchableOpacity>
  );
}

ArtworkCard.propTypes = {
  title: PropTypes.string.isRequired,
  Encoding: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ArtworkCard;
