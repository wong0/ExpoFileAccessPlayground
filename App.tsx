import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import usePromise from './usePromise';
import * as DocumentPicker from 'expo-document-picker';

const namedParameters: DocumentPicker.DocumentPickerOptions = {
  copyToCacheDirectory: true, // optional
  multiple: false, // optional
  type: '*/*' // optional
};

async function getDocumentAsync() {
  const documentResult: DocumentPicker.DocumentResult = await DocumentPicker.getDocumentAsync(namedParameters)
  return documentResult;
}

export default function App() {
  const [documentResult, setDocumentResult] = useState(0)

  // In the beginning, will call getDocumentAsync, which will display default file selector
  // Tested on ios, android simulator.
  usePromise(
    () => getDocumentAsync(),
    [documentResult]
  );

  // DocumentResult fields:
  const {
    type,
    file,
    lastModified,
    mimeType,
    name,
    output,
    size,
    url
  } = documentResult;
  
  return (
    <View style={styles.container}>
      <Text>Selected App:</Text>
      
      <Text>Type: {type}</Text>
      <Text>File: {file}</Text>
      <Text>Last modified: {lastModified}</Text>
      <Text>Mime Type: {mimeType}</Text>
      <Text>Name: {name}</Text>
      <Text>Output: {output}</Text>
      <Text>Size: {size}</Text>
      <Text>Type: {type}</Text>
      <Text>Url: {url}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
