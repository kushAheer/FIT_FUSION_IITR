import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Button from '../UI/Button'



function ScheduleScreen() {

    const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text>Schedule Screen</Text>
      <Button title="Go to Schedule Detail" onPress={() => navigation.navigate('ScheduleDetailScreen')} >Add Schedule</Button>
    </View>
    
  )
}

export default ScheduleScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});