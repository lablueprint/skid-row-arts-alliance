import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import {
  Button, StyleSheet, Text, View,
} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
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
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [soundStatus, setSoundStatus] = useState();
  const [position, setPosition] = useState(0);

  async function loadAudio() {
    const newSound = await Audio.Sound.createAsync(
      { uri: source },
      { shouldPlay: false },
    );
    console.log('sound');
    setSound(newSound);
    const resStatus = await sound.getStatusAsync();
    setSoundStatus(resStatus);
    setDuration(resStatus.durationMillis);
  }
  useEffect(() => {
    try {
      loadAudio();
    } catch (err) {
      console.error(err);
      console.log('fucked');
    } finally {
      console.log(soundStatus);
      console.log(duration);
    }
    return () => {
      if (sound !== null) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (sound === null) {
      return;
    }
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleScrub = async (value) => {
    if (sound === null) {
      return;
    }
    await sound.setPositionAsync(value * duration);
    setPosition(value);
  };

  const formatTime = (seconds) => {
    const pad = (num) => (`0${num}`).slice(-2);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${pad(remainingSeconds)}`;
  };

  return (
    <View>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
      <Slider
        style={styles.slider}
        value={position}
        // onValueChange={handleScrub}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="orange"
        maximumTrackTintColor="blue"
        thumbTintColor="green"
        onSlidingComplete={(newSliderValue) => handleScrub(newSliderValue)}
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
