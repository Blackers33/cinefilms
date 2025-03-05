import React from 'react';
import { Button, StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
   
 return (
   <SafeAreaView > 
    <TouchableOpacity onPress={() => navigation.navigate('Film')}>
        <Text>Go to FilmScreen</Text>
    </TouchableOpacity>
   </SafeAreaView>
 );
}