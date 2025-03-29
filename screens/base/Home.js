import { View,Text, TouchableOpacity, Image } from "react-native"
import { images } from "../../assets/images/images"
import { useNavigation } from "@react-navigation/native"
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
const Home = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-sky-900">
      <View className=" bg-green-200 rounded-lg py-2 text-lg font-bold my-2 mx-3">
        <Text className=" text-center text-lg font-bold"> <Icon name="book" size={20} color="red" className="mx-4" /> Book Worm App</Text>
        </View>

      <View className="flex-[0.5] items-center justify-center">
  
        <Image source={images.book} className="h-56 w-[56] bg-slate-300" />
      </View>
       
      <View className=" flex-[0.5] justify-center rounded-t-3xl mx-2 bg-sky-700">
        <Text className="text-white text-center text-base mx-3 py-2"> Lets visit Book worm app</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
            <Text className=" text-center text-lg rounded-lg bg-green-200 mx-3 py-2"><Icon name="location-arrow" size={20} color="black" className="mx-4" /> Lets Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home