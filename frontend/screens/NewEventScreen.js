import {
    StyleSheet,
    KeyboardAvoidingView,
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
    Text,
    ScrollView,
    TextInput,
    StatusBar,
} from "react-native";
import Send from 'react-native-vector-icons/Feather'

export default function NewEventScreen({ navigation }) {

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar  backgroundColor="white"/>
            <View style={styles.container}>
                <View>
                    <Text style={styles.onglet}>Créer un évènement</Text>
                </View>
                <View style={styles.infos}>
                    <View style={styles.inputBubble}>
                        <TextInput style={styles.input}
                            placeholder="Titre de l'évènement"
                            placeholderTextColor="black"></TextInput>
                    </View>
                    <View style={styles.inputBubble}>
                        <TextInput style={styles.input}
                            placeholder="Ajouter un lieu"
                            placeholderTextColor="black"></TextInput>
                    </View>
                    <View style={styles.inputBubble}>
                        <TextInput style={styles.input}
                            placeholder="Date"
                            placeholderTextColor="black"></TextInput>
                    </View>
                </View>
                <View>
                    <Image></Image>
                </View>
                <View>
                    <View style={styles.inputBubble}>
                        <TextInput style={styles.input}
                            placeholder="Ajouter un film"
                            placeholderTextColor="black" ></TextInput>
                    </View>
                    <View style={styles.inputBubble}>
                        <TextInput style={styles.input}
                            placeholder="Description"
                            placeholderTextColor="black"></TextInput>
                    </View>
                    <Text>Inviter des personnes</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => handleSubmitMessage()} style={styles.addEvent} activeOpacity={0.8}>
                        <Send name='Créer' size={30} color={'#C94106'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleSubmitMessage()} style={styles.removeEvent} activeOpacity={0.8}>
                        <Send name='Supprimer' size={30} color={'#C94106'} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: `Platform.OS === 'ios' ? 30 : 0,`
    },
    container: {
        flex: 1,
        backgroundColor: 'rgb(30.28.26)',
      
    },
    onglet: {
        fontFamily: 'Mulish',
        color: 'white',
    },
    inputBubble: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        margin: 10,
        backgroundColor: 'rgb(30.28.26)',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
});
