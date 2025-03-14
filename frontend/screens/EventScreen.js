import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Text,
  StatusBar,
  Keyboard
} from "react-native";
import { useState, useEffect } from "react";
import UserTopSection from "../components/common/UserTopSection";
import Event from "../components/EventsComponent/Event";
import Reseachsection from "../components/EventsComponent/reseachfiltreSection";
import Button from "../components/common/Button";
import { useSelector } from "react-redux";

export default function EventScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [events, setEvents] = useState([]);
  const [showCommentsForEvent, setShowCommentsForEvent] = useState(null);
  const [comment, setComment] = useState("");
  const [eventComments, setEventComments] = useState({});
  const [joinedEvents, setJoinedEvents] = useState({});
  const [inputreseach, setInputreseach] = useState("");
  const [filtreredEvents, setFiltreredEvents] = useState([]);
  const [filtrednonfound,setFiltrednonfound]=useState(false);

    

  const fetchEvents = async (setEvents, setJoinedEvents) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/events/`);
      const data = await response.json();
  
      setEvents(data.data);
  
      const initialJoinedEvents = {};
      data.data.forEach((event) => {
        initialJoinedEvents[event._id] = event.isParticipate;
      });
  
      setJoinedEvents(initialJoinedEvents);
    } catch (err) {
      console.log("Erreur lors de la récupération des événements:", err.message);
    }
  };
  
  const fetchCommentsForEvents = async (events, fetchComments) => {
    if (events.length === 0) return;
  
    try {
      await Promise.all(events.map((event) => fetchComments(event._id)));
    } catch (err) {
      console.log("Erreur lors de la récupération des commentaires:", err.message);
    }
  };
  // afficher tous les evenement à la chargement du eventScreen
  useEffect(() => {
    fetchEvents(setEvents, setJoinedEvents);
  }, []);

  useEffect(() => {
    fetchCommentsForEvents(events, fetchComments);
  }, [events]);



  const handleSearchIcon = () => {
    Keyboard.dismiss();
    const filtered = events.filter(
      (event) =>
        event.location.toLowerCase().trim() === inputreseach.toLowerCase().trim()
    );
  
    if (filtered.length === 0) {
      setFiltrednonfound(true);
      setFiltreredEvents("");
      setInputreseach("");

    }
    setInputreseach("");
    setFiltreredEvents(filtered);
  };

// clean les filtre pour afficher toutes les evenement 
  const handleClearFilter = () => {
    setFiltreredEvents([]); 
    setInputreseach("");  
    setFiltrednonfound(false);
  };

  // vers creationEvent screen
  const handlecreationEvent = () => {
    navigation.navigate("CreateEventScreen");
  };

  //pour afficher comments d'un évènement
  const toggleComments = (eventId) => {
    setShowCommentsForEvent(showCommentsForEvent === eventId ? null : eventId);
  };

  //function pour ajouter un commentaire par un utlisateur
  const ajoutcomment = (id) => {
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/events/${id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.token,
        content: comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setComment("");
          fetchComments(id);
        } else {
          console.log("Comment not posted");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //fetch les comments sur la route get commentaires
  const fetchComments = (id) => {
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/events/${id}/comments`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setEventComments((prev) => ({
            ...prev,
            [id]: data.comments,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };


  // Define the function for handling event joining
  const handleJoinEvent = (event) => {

    if (event.participants.some((participant) => participant._id === user._id)) {
      console.log("L'utilisateur participe déjà à cet événement !");
      return; // Empêche d'ajouter à nouveau l'utilisateur
    }
    fetch(
      `${process.env.EXPO_PUBLIC_IP_ADDRESS}/events/${event._id}/joingEvent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user.token,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
         new Error("Failed to join event");
        }
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          console.log(
            "Mise à jour réussie pour l'événement:",
            event._id,
            "isParticipate:",
            data.participation.isParticipate
          );
  
          setJoinedEvents((prev) => ({
            ...prev,
            [event._id]: data.participation.isParticipate,
          }));
  
          setEvents((prevEvents) =>
            prevEvents.map((e) =>
              e._id === event._id
                ? {
                    ...e,
                    participantsNbr: data.participation.participantsNbr,
                    isParticipate: data.participation.isParticipate,
                  }
                : e
            )
          );
        } else {
          console.error("Erreur:", data.error);
        }
      })
      .catch((error) => {
        console.error("Une erreur est survenue:", error);
      });
  };

  //formatee la chiane de date pour afficher sur card event
  function formatDateString(dateString) {
   
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
  
    // Retourner le format souhaité
    return `${day}/${month}/${year} à ${hour}:${minute}`;
  }
  

  return (
		<KeyboardAvoidingView behavior={Platform.OS === "padding"}>
			<SafeAreaView style={styles.container}>
      <StatusBar hidden={false} />
				<ImageBackground
					style={styles.backgroundImage}
					source={require("../assets/backgroundGradient.png")}
				>
					<UserTopSection user={user} navigation={navigation} />

					<View>
					  <Reseachsection
  						inputreseach={inputreseach}
  						setInputreseach={setInputreseach}
  						handlePressSearchIcon={handleSearchIcon}
  						handlerefreshIcon={handleClearFilter}
  					></Reseachsection>
  					<View style={styles.buttoncreationEvent}>
  						<Button
  							text='Créer un évènement'
  							onPress={() => handlecreationEvent()}
  						></Button>
  					</View>
  					<ScrollView>
  						<View style={styles.eventscontainer}>
  							{filtrednonfound ? (
  								<Text style={styles.textnonEventfound}>
  									Aucun événement trouvé pour cette ville. Pourquoi ne pas
  									ajouter la vôtre? 😊
  								</Text>
  							) : (
  								(filtreredEvents.length > 0 ? filtreredEvents : events).map(
  									(event) => (
  										<Event
  											key={event._id}
  											creatorUsername={event.owner.username}
  											title={event.title}
  											description={event.description}
  											location={event.location}
  											date={formatDateString(event.date)}
  											showComments={showCommentsForEvent === event._id}
  											displayComments={() => toggleComments(event._id)}
  											ajoutcomment={() => ajoutcomment(event._id)}
  											comments={eventComments[event._id] || []}
  											comment={comment}
  											setComment={setComment}
  											handleJoinEvent={() => handleJoinEvent(event)}
  											participants={event.participants}
  											nbrParticipants={event.participantsNbr}
  											joingEventhandle={joinedEvents[event._id] || false}
  											avatareventowner={event.owner.avatar}
  											avatar={user.avatar}
  											titleFilm={event.filmDetails.title}
  											backdrop={event.filmDetails.backdrop}
  											isParticipate={
  												joinedEvents[event._id] ?? event.isParticipate
  											}
  											_id={user._id}
  										/>
  									)
  								)
  							)}
  						</View>
  					</ScrollView>
					</View>
				</ImageBackground>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  userTopContainer: {
    marginTop: 20,
    width: "100%",
  },
  textInputrseach: {
    color: "#FFFFFF",
    fontSize: 14,
    width: "100%",
  },
  reseachcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    paddingRight: 20,
  },
  reseachInput: {
    width: "80%",
    height: 40,
  },

  buttoncreationEvent: {
    alignItems: "center",
    marginBottom: 20,
  },

  eventscontainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 10,
    flexGrow: 1,
    marginBottom: 280,
  },
  textnonEventfound:{
    color: "white",
    textAlign:"center",
    marginTop:150,

  }
});
