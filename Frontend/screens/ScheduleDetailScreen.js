import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GlobalStyles } from "../constants/color";

function ScheduleDetailScreen({ navigation }) {
    useEffect(() => {
        // Hide the header when this screen is active
        navigation.getParent()?.setOptions({
            headerShown: false,
        });

        return () => {
            // Show the header again when navigating back
            navigation.getParent()?.setOptions({
                headerShown: true,
            });
        };
    }, [navigation]);

    const initialData = [
        {
            title: "Peanut Butter Sandwich",
            calories: "500 Cal",
            subTitle: "Calories Consumed",
        },
        {
            title: "Chicken Salad",
            calories: "300 Cal",
            subTitle: "Calories Consumed",
        },
        {
            title: "Fruit Smoothie",
            calories: "200 Cal",
            subTitle: "Calories Consumed",
        },
        {
            title: "Grilled Chicken",
            calories: "400 Cal",
            subTitle: "Calories Consumed",
        },
    ];

    const colors = ["#FFD0CC", "#CCE4FF", "#F2CCFF", "#DDFFCC"]; // red, blue, purple, green

    const renderCard = ({ item, index }) => {
        const backgroundColor = colors[index % colors.length];
        return (
            <View style={[styles.cardContainer, { backgroundColor }]}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardContent}>
                    <View style={styles.leftBox}>
                        <View>
                            <Text style={styles.cardTitle}>{item.calories}</Text>
                            <Text style={styles.cardSubTitle}>{item.subTitle}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{item.calories}</Text>
                            <Text style={styles.cardSubTitle}>{item.subTitle}</Text>
                        </View>
                    </View>
                    <View style={styles.rightBox}>
                        <View>
                            <Text style={styles.cardTitle}>{item.calories}</Text>
                            <Text style={styles.cardSubTitle}>{item.subTitle}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{item.calories}</Text>
                            <Text style={styles.cardSubTitle}>{item.subTitle}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Breakfast</Text>
            <Text style={styles.subTitle}>Saturday , 31 Jan,8:39 AM</Text>
            <View style={styles.boxContainer}>
                <FlatList
                    data={initialData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderCard}
                />
            </View>
        </View>
    );
}

export default ScheduleDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: GlobalStyles.colors.backgroundColor,
    },
    mainTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 14,
        color: GlobalStyles.colors.primary50,
    },
    boxContainer: {
        flex: 1,
        marginTop: 20,
        borderTopColor: GlobalStyles.colors.gray100,
        borderTopWidth: 1,
        paddingTop: 20,
    },
    cardContainer: {
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        height: 168,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    leftBox: {
        width: '50%',
        flexDirection: "column",
        gap: 10,
    },
    rightBox: {
        width: '50%',
        flexDirection: "column",
        gap: 10,
    },
    cardSubTitle: {
        fontSize: 12,
        color: GlobalStyles.colors.primary50,
    },
});
