import * as React from 'react';
import {
  Button, Card, Title, Paragraph,
} from 'react-native-paper';
import PropTypes from 'prop-types';

function ResourceCard({
  navigation, title, day, time, location,
}) {
  const onPressEvent = () => {
    navigation.navigate('Event Details', {
      title,
      day,
      time,
      location,
    });
  };

  return (
    <Card style={{ margin: 10 }}>
      <Card.Content style={{ paddingBottom: 10 }}>
        <Title style={{ fontSize: 25, fontWeight: 'bold' }}>
          {title}
        </Title>
        <Paragraph>
          {day}
          {', '}
          {time}
        </Paragraph>
        <Paragraph>
          {location}
        </Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' }} />
      <Card.Actions>
        <Button onPress={onPressEvent}>Details</Button>
      </Card.Actions>
    </Card>
  );
}

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ResourceCard;
