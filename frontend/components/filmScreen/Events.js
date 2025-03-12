import { Button, StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, ImageBackground, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Avatar from '../common/Avatar';
import AutoCompleteSelector from '../common/AutoCompleteSelector';
import CommentsIcon from 'react-native-vector-icons/Fontisto';
import Search from 'react-native-vector-icons/EvilIcons'
import formatDate from '../../utils/utils';

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_IP_ADDRESS;

export default function Events({ filmId, allEvents, refresh }) {
    const [selectedCity, setSelectedCity] = useState("")
    const [eventsToShow, setEventsToShow] = useState(allEvents);

    const handleJoinEvent = (eventId) => {
        fetch(`${BACKEND_ADDRESS}/films/${eventId}/joingEvent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: 'aIXUWwSgQ2b4ifIPhk8F8r5wJSPJYuJk'})
          })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              // `refresh` est une fonction qui met `refreshData` à `true`, déclenchant ainsi l'exécution du `useEffect` pour rafraîchir les données
              //  En mettant à jour l'état `allEvents` apres intéraction avec l'event. 
              refresh();
            }
          });
    }

    const handleCitySearchSubmit = (selectedCity) => {
        if (selectedCity && typeof selectedCity === "string") {
            setSelectedCity(selectedCity.trim());
        } else {
            setSelectedCity(""); // Cas où l'utilisateur efface la ville
        }
    };

    useEffect(() => {
        if (selectedCity && selectedCity !== "") {
            const eventsForCity = allEvents.filter((event) => 
                event.location && event.location.toLowerCase().includes(selectedCity.toLowerCase())
            );
            setEventsToShow(eventsForCity);
        }
        else {
            setEventsToShow(allEvents);
        }
    }, [selectedCity, allEvents])
    
    //Affichet tout les événements avec map
    const events = eventsToShow?.map((event) => {
        //Mettre date en format jj/mm/aaaa hh:mm avec formatDate
        const date = formatDate(event.date);
        
        /**
        * Affiche les avatars des participants avec une gestion dynamique du nombre affiché.
        * - Si le nombre de participants est inférieur à 3, utilise `participantsLessThanThree` pour l'affichage.
        * - Sinon, affiche les 3 premiers avatars suivis de `+X` indiquant le nombre de participants restants.
        */
        const participantsLessThanThree = event?.participants?.map((participant, i)=> (
            <Avatar size={25} uri={participant.avatar} />
        ));
        
        const participants = event?.participants.length > 3 ? 
            <View style={styles.participants}>  
                <Avatar size={25} uri={event.participants[0].avatar}/>
                <Avatar size={25} uri={event.participants[1].avatar}/>
                <Avatar size={25} uri={event.participants[2].avatar}/>
                <Text style={styles.participantsNumber}>{`+ ${event.participants.length - 3}`}</Text>
            </View> 
            :
            <View style={styles.participants}>  
                {participantsLessThanThree}
            </View>;
        
        return(
            <View  style={styles.eventContainer}>
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
                    {participants}
                    <View style={styles.commentJongBar}>
                        <View style={styles.interactionToEventView}>
                            <TouchableOpacity onPress={() => displayComments()} style={styles.displayCommentsButton} activeOpacity={0.8}>
                                <CommentsIcon name='comments' size={30} color={'#C94106'} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => handleJoinEvent(event._id)} style={styles.joingEventButton} activeOpacity={0.8}>
                            {event.isParticipate ? 
                                <Text style={styles.buttonText}>Quitter</Text> 
                                : 
                                <Text style={styles.buttonText}>+ Joindre</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    })
    return(
        <View style={styles.events}>
            <View style={styles.filterBar}>
                <AutoCompleteSelector
                    type="city"
                    onSubmitEditing={handleCitySearchSubmit}
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
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        width: "90%",
        alignSelf: "center",   // Centre horizontalement,
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
        marginTop: 10,
        height: '50%'
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
        
    },
    commentJongBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    participants: {
        flexDirection: 'row',
    },
    participantsNumber: {
        color: 'white',
        fontSize: 20, 
        marginLeft: 5
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