import { Button, StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../common/Avatar';
import Comment from '../EventsComponent/comment';
import AutoCompleteSelector from '../common/AutoCompleteSelector';
import CommentsIcon from 'react-native-vector-icons/Fontisto';
import Back from 'react-native-vector-icons/Ionicons';
import Send from 'react-native-vector-icons/Feather'
import Icon from "react-native-vector-icons/Ionicons";
import formatDate from '../../utils/utils';
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const BACKEND_ADDRESS = process.env.EXPO_PUBLIC_IP_ADDRESS;

export default function Events({ filmId, allEvents, refresh }) {
    const [selectedCity, setSelectedCity] = useState("")
    const [eventsToShow, setEventsToShow] = useState(allEvents);
    const [displayComments, setDisplayComments] = useState(false);
    const [eventCommentsToShow, setEventCommentsToShow] = useState(null);
    const [eventComments, setEventComments] = useState([])
    const [comment, setComment] = useState({});
    const [search, setSearch] = useState("");

    const user = useSelector((state) => state.user.value);

    const handleJoinEvent = (eventId) => {
        fetch(`${BACKEND_ADDRESS}/events/${eventId}/joingEvent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({user: user.token})
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
            setSearch("");
        }
    };

    //Afficher ou masquer les commentaires au clique sur le boutton 'commentaires'
    const toggleComments = (eventId) => {
        if (eventCommentsToShow !== eventId) {
            fetch(`${BACKEND_ADDRESS}/events/${eventId}/comments`)
            .then(response => response.json())
            .then(dataComments => {
                if (dataComments) {
                    setEventComments(dataComments.comments);
                }
            });
            setEventCommentsToShow(eventId);
            setDisplayComments(true);
        } else {
            setDisplayComments(!displayComments);
        }
    };

    //Ajouter un commentaire 
    const handleSubmitComment = (eventId) => {
        const newComment = {
            user: user.token,
            content: comment,
          }
        fetch(`${BACKEND_ADDRESS}/events/${eventId}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setEventComments((prev) => [...prev, data.comment]);
            setComment('');
          }
        });
    }
    
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
       
    }, [selectedCity, allEvents]);
    //Affichet tout les événements avec map
    const events = eventsToShow?.map((event, i) => {
        //Mettre date en format jj/mm/aaaa hh:mm avec formatDate
        const date = formatDate(event.date);
        
        /**
        * Affiche les avatars des participants avec une gestion dynamique du nombre affiché.
        * - Si le nombre de participants est inférieur à 3, utilise `participantsLessThanThree` pour l'affichage.
        * - Sinon, affiche les 3 premiers avatars suivis de `+X` indiquant le nombre de participants restants.
        */

        const participantsLessThanThree = event?.participants?.map((participant, i) => (
            <Avatar key={i} size={25} uri={participant.avatar} />
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

        //Afficher les commentaires d'un événement 
        const comments = eventComments?.map((comment) => {
            const date = formatDistanceToNow(comment.date, {
                  addSuffix: true, 
                  includeSeconds: true,
                  locale: fr,
                });
            return <Comment
                avatar={comment.user.avatar}
                username={comment.user.username}
                key={comment._id || comment.date}
                date={date}
                content={comment.content}
            />
        });

        return(
            <View key={i} style={styles.container}>
                <View style={styles.eventContainer}>
                    <View style={styles.eventInfos}>
                        <Avatar size={40} uri={event.owner.avatar} style={styles.avatar}/>
                        <View style={styles.appointmentInfos}>
                            <Text style={styles.appointmentPlace}>{event.location} - {event.title}</Text>
                            <Text style={styles.appointmentDate}>{date}</Text>
                        </View>
                    </View>
                    <ScrollView style={{flex:1}}>
                        <ImageBackground source={require('../../assets/image-film.webp')} imageStyle={{ opacity: 0.3 }} style={styles.backgroundDescriptionEvent}>
                            <Text style={styles.descriptionText}>{event.description}</Text>
                        </ImageBackground>
                    </ScrollView>
                    <View style={styles.interactionBar}>
                        {participants}
                        <View style={styles.commentJongBar}>
                            <View style={styles.interactionToEventView}>
                                <TouchableOpacity onPress={() => toggleComments(event._id)} style={styles.displayCommentsButton} activeOpacity={0.8}>
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
                {displayComments && eventCommentsToShow === event._id && <View style={styles.commentsSection}>
                    {comments}
                    <View style={styles.inputcommentcontaire}>
                        <TextInput
                            style={styles.inputcomment}
                            placeholder="écrire un commentaire"
                            placeholderTextColor="#fff"
                            onChangeText={(value) => setComment(value)}
                            value={comment}
                            keyboardType='web-search'
                        ></TextInput>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => handleSubmitComment(event._id)}>
                          <Send name='send' size={30} color={'#C94106'} />
                        </TouchableOpacity>
                    </View>
                </View>}
            </View>
        )
    })
    
    return(
        <KeyboardAvoidingView style={styles.events}>
            {eventsToShow?.length > 0 ? ( 
                <>
                    <View style={styles.filterBar}>
                        <AutoCompleteSelector
                            type="city"
                            search={search}
                            setSearch={setSearch}
                            onSubmitEditing={handleCitySearchSubmit}
                        />
                        {selectedCity && selectedCity !== "" && (
                            <TouchableOpacity onPress={() => handleCitySearchSubmit("")}>
                                <View 
                                    style={{
                                        marginLeft: 10,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: 40,
                                        height: 40,
                                        borderWidth: 1,
                                        borderColor: "#bbb",
                                        borderRadius: 100,
                                    }}
                                >
                                    <Icon
                                        name={"close"}
                                        size={24}
                                        color='#bbb'
                                    />
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>

                    <ScrollView style={styles.containerevents}>
                        {events}
                    </ScrollView>
                </>
            ) : (
                <>  
                    {!!eventsToShow && <TouchableOpacity activeOpacity={0.7} onPress={() => handleCitySearchSubmit("")} style={styles.backIcon}>
                        <Back name='arrow-back-outline' size={30} color={'white'}/>
                    </TouchableOpacity>}
                    <Text style={styles.textNoEventToShow}>
                        Aucun événement en cours pour ce film.
                    </Text>
                </>
            )}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	containerevents: {
		marginTop: 10,
	},
	events: {
		flex: 1,
	},
	inputFilter: {
		backgroundColor: "rgba(77, 77, 77, 0.1)",
		width: "80%",
		height: 35,
		borderColor: "rgb(201, 65, 6)",
		borderWidth: 1,
		borderRadius: 30,
		marginRight: 5,
		color: "white",
	},

	filterBar: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "center",
		width: "90%",
		alignSelf: "center", // Centre horizontalement,
	},
	eventContainer: {
		width: "90%",
		alignSelf: "center", // Centre horizontalement
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		elevation: 3, // Ombre pour Android
		shadowColor: "#000", // Ombre pour iOS
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		backgroundColor: "rgba(77, 77, 77, 0.5)",
		padding: 10,
	},
	eventInfos: {
		flexDirection: "row",
	},
	appointmentInfos: {
		marginLeft: 10,
		flexShrink: 1,
	},
	appointmentPlace: {
		color: "white",
		fontSize: 18,
		fontWeight: "500",
	},
	appointmentDate: {
		color: "white",
		fontWeight: 300,
		fontSize: 16,
	},
	backgroundDescriptionEvent: {
		resizeMode: "cover",
		marginTop: 10,
		height: "100%",
	},
	descriptionText: {
		color: "white",
		fontSize: 18,
		padding: 10,
	},
	interactionBar: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	interactionToEventView: {},
	commentJongBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "60%",
	},
	participants: {
		flexDirection: "row",
	},
	participantsNumber: {
		color: "white",
		fontSize: 20,
		marginLeft: 5,
	},
	joingEventButton: {
		backgroundColor: "rgb(201, 65, 6)",
		width: 130,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 5,
	},
	buttonText: {
		textAlign: "center",
		color: "white",
		fontSize: 18,
		fontWeight: "500",
	},
	commentsSection: {
		width: "90%",
		backgroundColor: "rgba(77, 77, 77, 0.5)",
		borderRadius: 5,
		alignSelf: "center",
	},
	inputcommentcontaire: {
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
		marginTop: 5,
		borderRadius: 5,
		alignSelf: "center",
	},
	inputcomment: {
		flex: 1,
		height: 40,
		borderColor: "rgb(201, 65, 6)",
		borderWidth: 1,
		borderRadius: 20,
		paddingHorizontal: 10,
		marginRight: 10,
		color: "white",
		backgroundColor: "rgba(77, 77, 77, 0.2)",
	},
	textNoEventToShow: {
		textAlign: "center",
		marginTop: 20,
		color: "white",
		fontSize: 18,
		marginTop: 50,
	},
	backIcon: {
		margin: 30,
	},
});