import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import UserTopSection from "../components/common/UserTopSection";
import Event from "../components/EventsComponent/Event";
import Reseachsection from "../components/EventsComponent/reseachfiltreSection";
import Button from "../components/common/Button";

const mockUser = {
  _id: "67ca1d44bfc125477ece24ce",
  username: "Lou",
  password: "$2b$10$nPPlMDeI.NFKkZCh7Bs0e.WYyIVs3rwj6D6i.yCXlIWWXt3T8SDB6",
  email: "Lou@gmail.com",
  token: "_ZpeuBlpvOL6Qd1yLwyg50_GhAxA-cMl",
  friends: [],
  favGenres: ["447277", "812"],
  favMovies: ["Action", "Adventure"],
  __v: 0,
  age: 25,
  avatar:
    "https://image.noelshack.com/fichiers/2015/12/1426650974-quiz-les-personnages-de-tintin-5472.jpeg",
  biography: "je ne suis pas un robot",
  genre: "Homme",
  location: {
    name: "Paris",
    latitude: 48.859,
    longitude: 2.347,
  },
};

export default function EventScreen({ navigation }) {
  const user = mockUser; //useSelector((state) => state.user.value);
  const [events, setEvents] = useState([]);
  const [showCommentsForEvent, setShowCommentsForEvent] = useState(null);
  const [comment, setComment] = useState("");
  const [joinedEvents, setJoinedEvents] = useState({});
  const [inputreseach,setInputreseach]=useState("");


  //reseach input pour filtrer les evenements 
  const handleSearchIcon=()=>{

  }

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
        user: mockUser.token,
        content: comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setComment("");
        } else {
          console.log("comment not posted");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while adding your comment");
      });
  };


  //afficher toutes les events dès le chargement du eventScreen 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          process.env.EXPO_PUBLIC_IP_ADDRESS + "/events/"
        );
        const data = await response.json();

        setEvents(data.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchEvents(events);
  }, []);
  
  // Define the function for handling event joining
  const handleJoinEvent = (event) => {
    fetch(
      `${process.env.EXPO_PUBLIC_IP_ADDRESS}/events/${event._id}/joingEvent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: mockUser.token,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to join event");
        }
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          console.log("Mise à jour réussie pour l'événement:", event._id);

          // Mettre à jour uniquement l'événement spécifique
          setJoinedEvents((prev) => ({
            ...prev,
            [event._id]: true, // Marquer cet événement comme "rejoint"
          }));

          setEvents((prevEvents) =>
            prevEvents.map((e) =>
              e._id === event._id
                ? { ...e, participantsNbr: data.participation.participantsNbr }
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

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "padding"}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/backgroundGradient.png")}
        >
          <View style={styles.userTopContainer}>
            <UserTopSection user={user} />
          </View>
        <Reseachsection 
            inputreseach={inputreseach}
            setInputreseach={setInputreseach}
            handlePressSearchIcon={handleSearchIcon}
        ></Reseachsection>
          <View style={styles.buttoncreationEvent}>
            <Button
              text="Créer un évènement"
              onPress={() => handlecreationEvent()}
            ></Button>
          </View>
          <ScrollView>
            <View style={styles.eventscontainer}>
              {events.map((event) => (
                <Event
                  key={event._id}
                  title={event.title}
                  description={event.description}
                  location={event.location}
                  date={new Date(event.date).toLocaleString("fr-FR", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  showComments={showCommentsForEvent === event._id}
                  displayComments={() => toggleComments(event._id)}
                  ajoutcomment={() => ajoutcomment(event._id)}
                  comments={event.comments}
                  comment={comment}
                  setComment={setComment}
                  handleJoinEvent={() => handleJoinEvent(event)}
                  nbrParticipants={event.participantsNbr}
                  joingEventhandle={joinedEvents[event._id] || false}
                  avatar={mockUser.avatar}
                  titleFilm={event.filmDetails.title}
                  backdrop={event.filmDetails.backdrop}
                />
              ))}
            </View>
          </ScrollView>
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
    marginBottom: 45,
  },
});
