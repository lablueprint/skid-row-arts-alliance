import React from 'react';
import {
  StyleSheet, View, Text, ScrollView, Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  square: {
    width: 40,
    height: 40,
    backgroundColor: '#D9D9D9',
    margin: 40,
  },
});

function EventDetailScreen({
  navigation, title, date, day, location, time, summary,
}) {
  // navigation prop passing
  const onPressEvent = () => {
    const display = EventDetailScreen();
    if (display) {
      navigation.navigate('Event Details', {
        title, date, day, location, time, summary,
      });
    }
  };
  return (
    <ScrollView style={styles.container} onPress={onPressEvent}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{title}</Text>
      <Text>{date}</Text>
      <Text style={{ fontSize: 15, fontWeight: '10' }}>{location}</Text>
      <View style={{
        borderBottomColor: '#8A8A8A',
        borderBottomWidth: '1.5',
      }}
      />
      <View
        style={[
          styles.square,
          { flexDirection: 'row' },
          { flex: 3 },
        ]}
      />
      <Text>{day}</Text>
      <View style={styles.square} />
      <Text>{time}</Text>
      <View style={styles.square} />
      <Text>{location}</Text>
      <View style={{
        borderBottomColor: '#8A8A8A',
        borderBottomWidth: '1.5',
      }}
      />
      <Text style={{ fontSize: 20, fontWeight: '30' }}>Event Description</Text>
      <Text>
        {' '}
        {summary}
        {' '}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: '30' }}>Pictures</Text>
      <Image
        style={{ width: 200, height: 200 }}
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' }}
      />
    </ScrollView>
  );
}

export default EventDetailScreen;
