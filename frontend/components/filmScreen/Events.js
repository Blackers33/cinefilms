import { Button, StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, ImageBackground, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Avatar from '../common/Avatar';
import CommentsIcon from 'react-native-vector-icons/Fontisto';
import Search from 'react-native-vector-icons/EvilIcons'
import formatDate from '../../utils/utils';

export default function Events({ filmId, allEvents, refresh }) {
    const [filter, setFilter] = useState('');
    
    //Affichet tout les événements avec map
    const events = allEvents?.map((event, i) => {
        //Mettre date en format jj/mm/aaaa hh:mm avec formatDate
        const date = formatDate(event.date);
        
        /**
        * Affiche les avatars des participants avec une gestion dynamique du nombre affiché.
        * - Si le nombre de participants est inférieur à 3, utilise `participantsLessThanThree` pour l'affichage.
        * - Sinon, affiche les 3 premiers avatars suivis de `+X` indiquant le nombre de participants restants.
        */
        const participantsLessThenThree = event.particiapants?.map(participant => {
            <Avatar style={styles.avatar1} size={30} uri={participant.avatar}/>
        });
        const particiapants = event.participants.length > 3 ? 
        <View style={styles.participants}>  
            <Avatar style={styles.avatar1} size={30} uri={event.participants[0].avatar}/>
            <Avatar style={styles.avatar2} size={30} uri={event.participants[1].avatar}/>
            <Avatar style={styles.avatar3} size={30} uri={event.participants[2].avatar}/>
            <Text style={styles.participantsNumber}>{`+ ${event.particiapants.length - 3}`}</Text>
        </View> 
        : 
        <View style={styles.participants}>  
            {participantsLessThenThree}
        </View> 
        return(
            <View key={i} style={styles.eventContainer}>
                <View style={styles.eventInfos}>
                    <Avatar size={40} uri={event.owner.avatar} style={styles.avatar}/>
                    <View style={styles.appointmentInfos}>
                        <Text style={styles.appointmentPlace}>{event.location} - {event.title}</Text>
                        <Text style={styles.appointmentDate}>{date}</Text>
                    </View>
                </View>
                <ImageBackground source={require('../../assets/image-film.webp')} imageStyle={{ opacity: 0.3 }} style={styles.backgroundDescriptionEvent}>
                    <Text style={styles.descriptionText}>{event.description}</Text>
                </ImageBackground>
                <View style={styles.interactionBar}>
                    <View style={styles.interactionToEventView}>
                        {particiapants}
                        <TouchableOpacity onPress={() => displayComments()} style={styles.displayCommentsButton} activeOpacity={0.8}>
                            <CommentsIcon name='comments' size={30} color={'#C94106'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleJoinEvent()} style={styles.joingEventButton} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>+ Joindre</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    })
    return(
        <View style={styles.events}>
            <View style={styles.filterBar}>
                <TextInput
                    type='text'
                    placeholder='Filter...'
                    onChangeText={(value) => setFilter(value)}
                    value={filter}
                    style={styles.inputFilter}
                />
                <TouchableOpacity onPress={() => handleSubmitFilter()} style={styles.addFilterButton} activeOpacity={0.8}>
                    <Search name='search' size={34} color={'#C94106'} />
                </TouchableOpacity>
            </View>
            <View style={styles.eventsContainer}>
                <ScrollView style={styles.containerevents}>
                    {events}    
                </ScrollView>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    events: {

    },
    eventContainer: {
        
    },
    containerevents: {
        
    },
    inputFilter: {
        backgroundColor: 'rgba(77, 77, 77, 0.1)',
        width: '80%',
        height: 35,
        borderColor: 'rgb(201, 65, 6)',
        borderWidth: 1,
        borderRadius: 30,
        marginRight: 5,
        color : 'white',
    },
    
    filterBar: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },
    eventContainer: {
        width: "90%",       
        alignSelf: "center",   // Centre horizontalement
        borderRadius: 10,
        elevation: 3,          // Ombre pour Android
        shadowColor: "#000",   // Ombre pour iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: 'rgba(77, 77, 77, 0.5)',
        marginTop: 10,
        padding: 10,
        height: 250, 
    },
    eventInfos: {
        flexDirection: 'row',
    },
    appointmentInfos: {
        marginLeft: 10,
    },
    appointmentPlace: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    },
    appointmentDate: {
        color: 'white',
        fontWeight: 300,
        fontSize: 16,
    },
    backgroundDescriptionEvent: {
        resizeMode: "cover", 
        marginTop: 10
    },
    descriptionText: {
        color: 'white',
        fontSize: 18,
        padding: 10,
    },
    interactionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    interactionToEventView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%', 
    },
    participants: {
        flexDirection: 'row',
    },
    joingEventButton: {
        backgroundColor: 'rgb(201, 65, 6)',
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    }, 
})