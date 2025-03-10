//Création du screen pour créer un nouvel évènement

import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    View,
    Image,
    Text,
    TextInput,
    StatusBar,
} from "react-native";


export default function NewEventScreen({ navigation }) {

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <Text style={styles.title}>Créer son évènement</Text>
            <View style={styles.container}>
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
                    <Image style={styles.image} source={require('../assets/map.jpg')} />
                </View>
                <View>
                    <View style={styles.inputBubble}>
                        <TextInput style={styles.input}
                            placeholder="Ajouter un film"
                            placeholderTextColor="black" ></TextInput>
                    </View>
                    <View style={styles.inputBubble}>
                        <TextInput style={styles.inputDescription}
                            placeholder="Description de l'évènement"
                            placeholderTextColor="black"></TextInput>
                    </View>
                    <Text style={styles.text}>Inviter des personnes</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => handleSubmitMessage()} style={styles.addEvent} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Créer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleSubmitMessage()} style={styles.removeEvent} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'rgb(30.28.26)',

    },
    container: {
        flex: 1,
        backgroundColor: 'rgb(30.28.26)',

    },
    title: {
        fontFamily: 'Mulish',
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        marginVertical: 10,
        marginTop: 30,
        fontWeight: 600,
    },

    image: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 100,

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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    addEvent: {
        backgroundColor: 'rgba(201, 65, 6, 0.78)',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
    },
    removeEvent: {
        backgroundColor: 'rgb(164, 163, 163)',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        marginLeft: 10,


    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Mulish',
    },

    inputDescription: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginTop: -20,
        marginBottom: -20,
        paddingTop: 10,
    }



});
