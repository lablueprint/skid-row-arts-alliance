import * as React from 'react';
import {
  Button, Card, Title, Paragraph,
} from 'react-native-paper';

function MapEvent() {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Content style={{ paddingBottom: 10 }}>
        <Title style={{ fontSize: 25, fontWeight: 'bold' }}>Event Title</Title>
        <Paragraph>MM/DD/YYYY     HH:MM - HH:MM</Paragraph>
        <Paragraph>Location</Paragraph>
        <Paragraph>Nonprofits</Paragraph>
        <Paragraph>Description</Paragraph>
        <Paragraph>Tag0 | Tag1 | Tag2</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' }} />
      <Card.Actions>
        <Button>Details</Button>
        <Button>I&apos;m interested!</Button>
      </Card.Actions>
    </Card>
  );
}

export default MapEvent;
