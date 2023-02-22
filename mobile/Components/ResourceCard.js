import * as React from 'react';
import {
  Button, Card, Title, Paragraph,
} from 'react-native-paper';
import PropTypes from 'prop-types';

function ResourceCard({
  navigation, title, day, time, location, summary, url, number, email, website,
}) {
  const onPressEvent = () => {
    navigation.navigate('Resource Details', {
      title,
      day,
      time,
      location,
      summary,
      url,
      number,
      email,
      website,
    });
  };

  console.log(summary);

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
      <Card.Cover source={{ uri: url }} />
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
  location: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ResourceCard;
