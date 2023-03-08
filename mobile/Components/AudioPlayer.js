import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import {
  Button, StyleSheet, Text, View,
} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  // container: {
  //   alignItems: 'center',
  // },
  slider: {
    width: '80%',
    height: 40,
  },
  timestamp: {
    fontSize: 18,
    marginVertical: 8,
  },
});

function AudioPlayer({ source }) {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded && !status.isBuffering) {
      setPosition(status.positionMillis / status.durationMillis);
    }
  };

  useEffect(() => {
    async function loadAudio() {
      const { sound, status } = await Audio.Sound.createAsync(
        { uri: source },
        { shouldPlay: false },
        onPlaybackStatusUpdate,
      );
      setAudio(sound);
      await sound.getStatusAsync();
      // console.log('hello');
      setDuration(status.durationMillis);
    }
    loadAudio();
    return () => {
      console.log('cleanup1');
      if (audio) {
        console.log('cleanup');
        audio.unloadAsync();
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (audio === null) {
      return;
    }
    if (isPlaying) {
      await audio.pauseAsync();
    } else {
      await audio.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleScrub = async (value) => {
    if (audio === null) {
      return;
    }
    await audio.setPositionAsync(value * duration);
    setPosition(value);
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const pad = (num) => (`0${num}`).slice(-2);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${pad(remainingSeconds)}`;
  };

  return (
    <View style={styles.container}>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
      <Slider
        style={styles.slider}
        value={position}
        onValueChange={handleScrub}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="orange"
        maximumTrackTintColor="blue"
        thumbTintColor="green"
      />
      <Text style={styles.timestamp}>{formatTime(position * duration)}</Text>
      <Text style={styles.timestamp}>{formatTime(duration)}</Text>
    </View>
  );
}

AudioPlayer.propTypes = {
  source: PropTypes.string.isRequired,
};

export default AudioPlayer;
