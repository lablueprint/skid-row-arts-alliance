import React, { useState, useMemo } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

function DotTextInput({ value, onChangeText }) {
  const [secure, setSecure] = useState(true);

  const secureText = useMemo(() => {
    if (value && secure) {
      const dotCount = value.length - 1;
      const secText = '.'.repeat(dotCount) + value.slice(-1);
      return secText;
    }
    return value;
  }, [secure, value]);

  const handleTextChange = (text) => {
    onChangeText(text);
  };

  const handleFocus = () => {
    setSecure(false);
  };

  const handleBlur = () => {
    setSecure(true);
  };

  return (
    <TextInput
      style={{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      }}
      secureTextEntry={secure}
      value={secureText}
      onChangeText={handleTextChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      autoCapitalize={false}
    />
  );
}

DotTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};

export default DotTextInput;
