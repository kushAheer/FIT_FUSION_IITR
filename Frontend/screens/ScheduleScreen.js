import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../UI/Button";
import { GlobalStyles } from "../constants/color"
import * as DateTimePicker from 'expo-date-time-picker';
function ScheduleScreen() {
	const navigation = useNavigation();
	const [date, setDate] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false); 
	const [schedules, setSchedules] = useState([
		{
			date: "14/05/2025",
			checkIn: "09:00 AM",
			checkOut: "05:00 PM",
			showQR: false, 
		},
		{
			date: "15/05/2025",
			checkIn: "10:00 AM",
			checkOut: "06:00 PM",
			showQR: false,
		},
		{
			date: "16/05/2025",
			checkIn: "08:30 AM",
			checkOut: "04:30 PM",
			showQR: false,
		},
	]);

	const toggleQR = (index) => {
		const updatedSchedules = schedules.map((schedule, i) =>
			i === index ? { ...schedule, showQR: !schedule.showQR } : schedule
		);
		setSchedules(updatedSchedules);
	};

  return (
    <View style={styles.container}>
      <Text>Schedule Screen</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Your Session Details</Text>
          <TouchableOpacity style={styles.inputField} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.inputLabel}>Date</Text>
            <Text style={styles.inputValue}>{date.toDateString()}</Text>
          </TouchableOpacity>
          <View style={styles.timeContainer}>
            <View style={styles.timeInput}>
              <Text style={styles.inputLabel}>Entry Time</Text>
              <Text style={styles.inputValue}>09:00 AM</Text>
            </View>
            <View style={styles.timeInput}>
              <Text style={styles.inputLabel}>Exit Time</Text>
              <Text style={styles.inputValue}>05:00 PM</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.repeatButton}>
            <Text style={styles.repeatButtonText}>Repeat Same Schedule Daily</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.scheduleButton}>
          <Text style={styles.scheduleButtonText}>Schedule Session</Text>
        </TouchableOpacity>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scheduling History</Text>
          {schedules.map((schedule, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyDate}>{schedule.date}</Text>
                <Text style={styles.historyTime}>{schedule.checkIn} - {schedule.checkOut}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.qrButton} 
                onPress={() => toggleQR(index)}>
                  <Text style={styles.qrButtonText}>View QR ▼</Text>
              </TouchableOpacity>
              {schedule.showQR && (
                <View style={styles.qrContainer}>
                  {/* OR code component will be here left for anagh */}
                  <Text style={styles.qrPlaceholder}>QR Code Placeholder</Text>
                </View>
              )}
            </View>
          ))}
        </View> 
      </ScrollView>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            selectedDate && setDate(selectedDate);
          }}
        />
      )}
    </View>
  );
};
export default ScheduleScreen

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colors.backgroundColor,
		paddingHorizontal: 20,
	},
	content: {
		paddingBottom: 30,
	},
	section: {
		marginVertical: 20,
		backgroundColor: GlobalStyles.colors.backgroundColor,
		borderRadius: 12,
		padding: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: GlobalStyles.colors.black,
		marginBottom: 16,
	},
	inputField: {
		marginBottom: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#DDDDDD",
	},
	inputLabel: {
		fontSize: 14,
		color: "#666666",
		marginBottom: 4,
	},
	inputValue: {
		fontSize: 16,
		color: GlobalStyles.colors.black,
		fontWeight: "500",
	},
	timeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	timeInput: {
		width: "48%",
	},
	repeatButton: {
		backgroundColor: GlobalStyles.colors.secondary,
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 10,
	},
	repeatButtonText: {
		color: GlobalStyles.colors.primary50,
		fontWeight: "500",
	},
	scheduleButton: {
		backgroundColor: GlobalStyles.colors.primary,
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 20,
	},
	scheduleButtonText: {
		color: GlobalStyles.colors.backgroundColor,
		fontWeight: "bold",
		fontSize: 16,
	},
	historyItem: {
		marginVertical: 12,
		padding: 16,
		backgroundColor: GlobalStyles.colors.gray,
		borderRadius: 8,
	},
	historyHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	historyDate: {
		fontWeight: "500",
		color: GlobalStyles.colors.black,
	},
	historyTime: {
		color: GlobalStyles.colors.gray50,
	},
	qrButton: {
		alignSelf: "flex-end",
		padding: 8,
	},
	qrButtonText: {
		color: GlobalStyles.colors.primary,
		fontWeight: "500",
	},
	qrContainer: {
		marginTop: 12,
		padding: 16,
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		alignItems: "center",
	},
	qrPlaceholder: {
		color: GlobalStyles.colors.gray100,
	},
});
