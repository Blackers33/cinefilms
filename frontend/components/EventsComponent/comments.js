import { Button, StyleSheet, Text, View } from "react-native";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale"; // Importation de la locale française
import Avatar from "../common/Avatar";


export default function Comments(props) {
  return (
   <>
      {props.comments
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // classement des commentaires du plus récent au plus ancien
        .map((comment) => {
          const formattedDate = formatDistanceToNow(new Date(comment.date), {
            addSuffix: true,
            includeSeconds: true,
            locale: fr, // Utilisation de la locale française
          });

          return (
             <View style={styles.commentContainer}
             key={comment._id || comment.date}>
                 <Avatar uri={comment.user.avatar}></Avatar>
                 <Text style={styles.usernametext}>{comment.user.username}</Text>
                 <View style={styles.contenucomment}>
                   <Text style={styles.commentText}>{formattedDate}</Text>
                   <Text
                    style={styles.commentText}>
                     {comment.content}
                   </Text>
                 </View>
               </View>
          );
        })}
    </>
  );
}


const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 5,
  },
  contenucomment: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  commentText: {
    fontSize: 10,
    color: "white",
  },
  usernametext: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
    margin: 10,
  },
});
