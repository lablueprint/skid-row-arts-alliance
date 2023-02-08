// component that renders artwork cards on gallery screen
import * as React from 'react';
import {
  View, Image, TouchableOpacity, ScrollView,
} from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';
import PropTypes from 'prop-types';

function ArtworkCard({ title, Encoding, key, name, description, email, navigation, }) {
  const onPressEvent = () => {
    navigation.navigate('Artwork Details', {
      title,
      Encoding,
      key,
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
          key={key}
          source={{ uri: Encoding }}
        />
      </Card>
    </TouchableOpacity>
  );
}

ArtworkCard.propTypes = {
  title: PropTypes.string.isRequired,
  Encoding: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ArtworkCard;
