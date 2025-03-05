import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
 return (
   <View>
     <Text>Home Screen</Text>
     <Button
       title="Go to Comments"
       onPress={() => navigation.navigate('Comments')}
     />
   </View>
 );
}