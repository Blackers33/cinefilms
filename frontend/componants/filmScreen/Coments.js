import { View, TextInput, Button } from react - native
import {useState} from 'react'
import Coments from './filmScreen/Coments';

function Coments() {
  const [coments, setComents]= useState ()
  const handleSubmit = () => {
    console.log(coments);
  };
  return (
<<<<<<< HEAD
    
=======
>>>>>>> 71c53f7fb995ef50046fa3e0188be1d7a45e8fc2
    <View>
<TextInput>
onChangeText={(value) => setComents(value)}

value={coments}
</TextInput>
<Button title="Commentaire" onPress={() => handleSubmit()} />
    </View> 
 );
}

export default Coments;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '30.28.26',
    color: '201.65.6',
    alignItems: 'center',
    justifyContent: 'center',
  },
 });