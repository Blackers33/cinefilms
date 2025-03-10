import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import UserTopSection from "../components/common/UserTopSection";
import Event from "../components/EventsComponent/Event";
import Inputstyled from "../components/common/TextInput";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../components/common/Button";
import { Dropdown } from "react-native-element-dropdown";
import { LinearGradient } from "expo-linear-gradient";

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

const villes = [
  { id: "Paris", name: "Paris" },
  { id: "Marseille", name: "Marseille" },
  { id: "Lyon", name: "Lyon" },
  { id: "Toulouse", name: "Toulouse" },
  { id: "Nice", name: "Nice" },
  { id: "Bordeaux", name: "Bordeaux" },
  { id: "Lille", name: "Lille" },
  { id: "Nantes", name: "Nantes" },
  { id: "Strasbourg", name: "Strasbourg" },
];

export default function EventScreen({ navigation }) {
  const user = mockUser; //useSelector((state) => state.user.value);
  const [events, setEvents] = useState([]);
  const [ville, setVille] = useState(null);
  const [userNameseach, setUserNameseach] = useState("");
  const [showCommentsForEvent, setShowCommentsForEvent] = useState(null);
  const [comment, setComment] = useState('');

  const userId= "AJrdD3LbgYExWqbR81vDDCwwF3xc7Qtt";

  const handledSelectville = (selectedValue) => {
    setVille(selectedValue.name);
  };

  const toggleComments = (eventId) => {
    setShowCommentsForEvent(showCommentsForEvent === eventId ? null : eventId);
  };

  const ajoutcomment=(event)=>{
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/events/${event._id}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userId,
        content: comment, 
      }),
    })
    .then((response) => response.json())  
    .then((data) => {
      if (data.result) {

        setComment('');  // Effacer le champ commentaire
      } else {
        console.log("comment not posted")
      }
    })
    .catch((error) => {
      console.error(error);
      setError('An error occurred while adding your comment');
    })

  }

  // Fonction pour rechercher les événements par nom d'utilisateur
  const handleUsername = () => {
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/events/${userNameseach}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          setEvents(data.data);
        } else {
          console.log("No events found for this user.");
        }
      });
  };

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

    fetchEvents();
  }, []);

 

  // Define the function for handling event joining
  const handleJoinEvent = () => {
    console.log("Joining event...");
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
          <View style={styles.reseachcontainer}>
            <View style={styles.reseachInput}>
              <Inputstyled placeholder="Rechercher un film"></Inputstyled>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <FontAwesome name="search" size={25} color="#ec6e5b" />
            </TouchableOpacity>
           
          </View>
          <View style={styles.reseachsecondcontainer}>
            <View style={styles.reseachUserInput}>
              <Inputstyled
                placeholder="Recherche utilisateur"
                onChangeText={setUserNameseach}
                value={userNameseach}
              ></Inputstyled>
              <TouchableOpacity activeOpacity={0.7} onPress={handleUsername}>
                <FontAwesome name="search" size={25} color="#ec6e5b" />
              </TouchableOpacity>
            </View>
            

            <Dropdown
              style={styles.dropdowngenre}
              selectedTextStyle={styles.selectedTextStyle}
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              activeColor="false"
              maxHeight={300}
              data={villes}
              labelField="name"
              valueField="id"
              placeholder="choisir ta ville"
              placeholderStyle={{
                color: "rgba(206, 196, 188, 0.8)",
                fontSize: 14,
              }}
              onChange={handledSelectville}
              value={ville}
            />
    
          </View>
          <View style={styles.buttoncreationEvent}>
            <Button text="Créer un évènement"></Button>
          </View>
          <ScrollView >
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
                  ajoutcomment={()=>ajoutcomment(event)}
                  comments={event.comments}
                  comment={comment}
                  setComment={setComment}
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
    alignItems:"center",
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
    marginTop: 5,
    paddingRight: 20,
  },
  reseachInput: {
    width: "80%",
    height: 40,
  },

  buttoncreationEvent: {
    alignItems: "center",
  },
  dropdowngenre: {
    height: 20,
    width: 100,
    opacity: 0.7,
    borderRadius: 20,
    backgroundColor: "rgba(29, 29, 29,0.9)",
    borderColor: "#C94106",
    borderTopWidth: 1,
    paddingLeft: 10,
  },

  selectedTextStyle: {
    fontSize: 10,
    color: "white",
    paddingleft: 10,
  },
  containerStyle: {
    backgroundColor: "black",
    borderRadius: 10,
    paddingleft: 10,
  },
  itemTextStyle: {
    color: "#ffffff",
    fontSize: 10,
    paddingleft: 10,
  },
  reseachUserInput: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reseachsecondcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    paddingRight: 20,
  },
  eventscontainer:{
    flexDirection:"column",
    justifyContent:"space-between",
  }
});
