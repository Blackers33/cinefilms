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
                <View style={styles.userInfos}>
                 <Avatar uri={comment.user.avatar}></Avatar>
                 <Text style={styles.usernametext}>{comment.user.username}</Text>
                </View>
                <View style={styles.contenucomment}>
                  <Text
                   style={styles.commentText}>
                    {comment.content}
                  </Text>
                  <Text style={styles.commentDate}>{formattedDate}</Text>
                </View>
               </View>
          );
        })}
    </>
  );
}


const styles = StyleSheet.create({
  commentContainer: {
    padding: 5,
    backgroundColor: 'rgba(77, 77, 77, 0.2)',
    opacity: 1,
    marginTop: 5,
    borderRadius: 5,
  },
  userInfos: {
    flexDirection: 'row',
    justifyContent: 'start',
  },
  contenucomment: {
    marginLeft: 37
  },
  commentText: {
    color: "white",
    fontSize: 15,
    color: 'white',
  },
  commentDate: {
    fontSize: 12,
    color : 'white',
    fontWeight: 200,
  },
  usernametext: {
    fontWeight: 500,
    alignSelf:"center",
    fontSize: 14,
    color: 'rgb(201, 65, 6)',
    marginLeft: 5,
  },
});
