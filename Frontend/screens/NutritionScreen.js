import { StyleSheet , Text , View } from "react-native"
import NutritionGoals from "../Components/Nutrition/NutritionGoals"
import { GlobalStyles } from "../constants/color"
function NutritionScreen() {
  return (
    <View style={styles.container}>
        <NutritionGoals />
        
        
    </View>
  )
}

export default NutritionScreen

const styles = StyleSheet.create({
  container: {
    
    backgroundColor : GlobalStyles.colors.backgroundColor,
    flex: 1,
    
    
  },
})
