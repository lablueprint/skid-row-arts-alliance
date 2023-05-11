import React, { useState } from 'react';
import {
  Dimensions, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import {
  useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    padding: 20,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'MontserratMedium',
    fontSize: 20,
  },
  selectAllButton: {
    width: 14,
    height: 14,
    marginLeft: 10,
  },
  tags: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderColor: '#C0C0DD',
    borderRadius: 8,
    borderWidth: 2,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 15,
    marginBottom: 15,
  },
  tagText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#1E2021',
  },
  selectedTag: {
    backgroundColor: '#D0D0E8',
    borderColor: '#4C4C9B',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 120,
  },
  clearButton: {
    width: (width / 2) - 32,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#424288',
    paddingVertical: 8,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'MontserratSemiBold',
    color: '#424288',
    fontSize: 16,
  },
  applyButton: {
    width: (width / 2) - 32,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#424288',
    paddingVertical: 8,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: 'MontserratSemiBold',
    color: '#fff',
    backgroundColor: '#4C4C9B',
    fontSize: 16,
  },
});

const TAGS = [
  { id: '1', section: 'Image', label: 'digital art' },
  { id: '2', section: 'Image', label: 'graphic design' },
  { id: '3', section: 'Image', label: 'illustration' },
  { id: '4', section: 'Image', label: 'photography' },
  { id: '5', section: 'Image', label: 'traditional art' },
  { id: '6', section: 'Audio', label: 'music' },
  { id: '7', section: 'Audio', label: 'poetry' },
  { id: '8', section: 'Audio', label: 'storytelling' },
  { id: '9', section: 'Video', label: 'music' },
  { id: '10', section: 'Video', label: 'performance' },
  { id: '11', section: 'Video', label: 'short film' },
].map((tag) => ({ ...tag, selected: false }));

function ArtworkFilterScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Montserrat: Montserrat_400Regular,
    MontserratMedium: Montserrat_500Medium,
    MontserratSemiBold: Montserrat_600SemiBold,
    MontserratBold: Montserrat_700Bold,
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectCategory = (category) => {
    if (selectedCategories.includes(category)) {
      // Deselect the category
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
      setSelectedTags(selectedTags.filter((tag) => tag.section !== category));
    } else {
      // Select the category
      setSelectedCategories([...selectedCategories, category]);
      setSelectedTags([...selectedTags, ...TAGS.filter((tag) => tag.section === category)]);
    }
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
  };

  const applyFilters = () => {
    navigation.navigate('Gallery', { selectedTags });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Image</Text>
        <TouchableOpacity onPress={() => handleSelectCategory('Image')}>
          <Image
            source={selectedCategories.includes('Image') ? require('../assets/filter/selectAllChecked.png') : require('../assets/filter/selectAllUnchecked.png')}
            style={styles.selectAllButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tags}>
        {TAGS.filter((tag) => tag.section === 'Image').map((tag) => (
          <TouchableOpacity
            key={tag.id}
            style={[
              styles.tag,
              selectedTags.includes(tag) ? styles.selectedTag : null,
            ]}
            onPress={() => {
              const index = selectedTags.findIndex((t) => t.id === tag.id);
              if (index !== -1) {
                setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
              } else {
                setSelectedTags([...selectedTags, tag]);
              }
            }}
          >
            <Text
              style={[
                styles.tagText,
              ]}
            >
              {tag.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Audio</Text>
        <TouchableOpacity onPress={() => handleSelectCategory('Audio')}>
          <Image
            source={selectedCategories.includes('Audio') ? require('../assets/filter/selectAllChecked.png') : require('../assets/filter/selectAllUnchecked.png')}
            style={styles.selectAllButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tags}>
        {TAGS.filter((tag) => tag.section === 'Audio').map((tag) => (
          <TouchableOpacity
            key={tag.id}
            style={[
              styles.tag,
              selectedTags.includes(tag) ? styles.selectedTag : null,
            ]}
            onPress={() => {
              const index = selectedTags.findIndex((t) => t.id === tag.id);
              if (index !== -1) {
                setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
              } else {
                setSelectedTags([...selectedTags, tag]);
              }
            }}
          >
            <Text
              style={[
                styles.tagText,
              ]}
            >
              {tag.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Video</Text>
        <TouchableOpacity onPress={() => handleSelectCategory('Video')}>
          <Image
            source={selectedCategories.includes('Video') ? require('../assets/filter/selectAllChecked.png') : require('../assets/filter/selectAllUnchecked.png')}
            style={styles.selectAllButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tags}>
        {TAGS.filter((tag) => tag.section === 'Video').map((tag) => (
          <TouchableOpacity
            key={tag.id}
            style={[
              styles.tag,
              selectedTags.includes(tag) ? styles.selectedTag : null,
            ]}
            onPress={() => {
              const index = selectedTags.findIndex((t) => t.id === tag.id);
              if (index !== -1) {
                setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
              } else {
                setSelectedTags([...selectedTags, tag]);
              }
            }}
          >
            <Text
              style={[
                styles.tagText,
              ]}
            >
              {tag.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <View>
        {selectedTags.map((tag, index) => (
          <Text key={index}>{tag.label}</Text>
        ))}
      </View> */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={applyFilters} style={styles.applyButton}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

ArtworkFilterScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default ArtworkFilterScreen;
