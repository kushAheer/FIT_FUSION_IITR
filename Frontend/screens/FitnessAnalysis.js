import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { accelerometer, gyroscope, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';import { Pedometer } from 'expo-sensors';
import { Pedometer } from 'expo-sensors';

function FitnessActivity(){
    const [currentActivity, setCurrentActivity] = useState('Running');
    const [duration, setDuration] = useState(0);
    const [calories, setCalories] = useState(0);
    const [distance, setDistance] = useState(0);
    const [steps, setSteps] = useState(0);
    const [activities, setActivities] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    useEffect(() => {
        setUpdateIntervalForType(SensorTypes.accelerometer, 1000);
        
        const subscription = accelerometer.subscribe(({ x, y, z }) => {
          if (isTracking) {
            // Process data with ML model
            const activityType = detectActivityType(x, y, z);
            setCurrentActivity(activityType);
          }
        });

    return () => subscription.unsubscribe();
    }, [isTracking]);

    useEffect(() => {

        Pedometer.watchStepCount(result => {
          setSteps(result.steps);
        });
    
    return () => Pedometer.unsubscribe();
    }, []);

    const detectActivityType = (x, y, z) => {
        // model logic will here manan
        // input are taken implement it how ever it can be 
    };
    const startTracking = () => {
        setIsTracking(true);
        // Reseting metrics here use it if needed or remove it ( for manan )
        setDuration(0);
        setCalories(0);
        setDistance(0);
      };
      const stopTracking = () => {
        setIsTracking(false);
        // Save session to history
        setActivities(prev => [{
          id: Date.now(),
          type: currentActivity,
          duration,
          calories,
          distance,
          date: new Date().toLocaleDateString()
        }, ...prev]);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.mainTitle}>Running</Text>
                <Text style={styles.date}>12 Mar 2025</Text>
                <Pressable style={styles.dateSelector}>
                    <Text style={styles.dateSelectorText}>Today ▼</Text>
                </Pressable>
            </View>
            <View style={styles.currentStatsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>01:34:23</Text>
                    <Text style={styles.statLabel}>Time</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>360 Cal</Text>
                    <Text style={styles.statLabel}>Burning</Text>
                </View>
          </View>
            <ScrollView style={styles.historyContainer}>
                {[1, 2, 3, 4].map((item, index) => (
                <View key={index} style={styles.activityCard}>
                    <Text style={styles.activityType}>Running</Text>
                    {/** this is just text here right data from data base ml to be added her*/}
                    <View style={styles.activityStats}>
                        <Text style={styles.activityStat}>01:23:45</Text>
                        <Text style={styles.activityStat}>160 Cal</Text>
                        <Text style={styles.activityStat}>3.5 Km</Text>
                    </View>
                </View>
                ))}
            </ScrollView>
            <Pressable 
                style={({ pressed }) => [
                    styles.controlButton,
                    pressed && styles.buttonPressed
                ]}
                onPress={isTracking ? stopTracking : startTracking}
            >
                <Text style={styles.controlButtonText}>
                    {isTracking ? 'Stop Tracking' : 'Start Tracking'}
                </Text>
            </Pressable>
        </View>
    );
}

export default ActivityScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    header: {
      marginBottom: 30,
    },
    activityTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000',
    },
    date: {
      fontSize: 16,
      color: '#666',
      marginTop: 5,
    },
    timeSelector: {
      fontSize: 16,
      color: '#007AFF',
      marginTop: 10,
    },
    currentStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
    },
    statBox: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
    },
    statLabel: {
      fontSize: 16,
      color: '#666',
    },
    history: {
        flex: 1,
    },
    activityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      },
      activityStats: {
        flexDirection: 'row',
        gap: 20,
      },
      controls: {
        paddingVertical: 20,
      },
      controlButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
      },
      controlButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
    });