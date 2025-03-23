import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const FitnessSocialApp = () => {
  // Sample data
  const circleProfiles = [
    { id: 1, image: require('../assets/profile.jpg') },
    { id: 2, image: require('../assets/profile1.webp') },
    { id: 3, image: require('../assets/profile2.webp') },
    { id: 4, image: require('../assets/profile3.webp') },
    { id: 5, image: require('../assets/profile.jpg') },
    { id: 6, image: require('../assets/profile1.webp') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.circleSection}>
        <Text style={styles.sectionTitle}>Your Circle</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.circleContainer}>
          {circleProfiles.map((profile) => (
            <View key={profile.id} style={styles.circleProfile}>
              <Image source={profile.image} style={styles.circleImage} />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Feed Post - Fixed: Adjusted the position to remove gap */}
      <ScrollView style={styles.feed}>
        <View style={styles.postContainer}>
          {/* Post Header */}
          <View style={styles.postHeader}>
            <View style={styles.postUser}>
              <Image source={require('../assets/profile.jpg')} style={styles.postUserImage} />
              <View style={styles.postUserDetails}>
                <Text style={styles.postUserName}>John Doe Guy</Text>
                <View style={styles.postUserLocation}>
                  <Ionicons name="location" size={12} color="#666" />
                  <Text style={styles.postLocationText}>at Roorkee Gym</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Post Caption */}
          <Text style={styles.postCaption}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim eniam, qouis elads{' '}
            <Text style={styles.readMore}>Read More...</Text>
          </Text>

          {/* Post Image */}
          <Image source={require('../assets/profile.jpg')} style={styles.postImage} />

          {/* Post Actions */}
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="heart-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="chatbubble-outline" size={22} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="arrow-redo-outline" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.spacer} />
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="bookmark-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Post Footer */}
          <View style={styles.postFooter}>
            <Image source={require('../assets/profile.jpg')} style={styles.postUserImage} />
            <View style={styles.postUserDetails}>
              <Text style={styles.postUserName}>John Doe Guy</Text>
              <View style={styles.postUserLocation}>
                <Ionicons name="location" size={12} color="#666" />
                <Text style={styles.postLocationText}>at Roorkee Gym</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 5,
  },
  time: {
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  circleSection: {
    // Fixed: Wrapped circle section in a container with proper height
    height: 110, // Adjusted height to fit title and scrollview without extra space
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 14,
    marginTop: 0, // Reduced margin
    marginBottom: 6, // Reduced margin
  },
  circleContainer: {
    paddingLeft: 14,
    height: 70, // Fixed height to prevent extra space
  },
  circleProfile: {
    marginRight: 12,
  },
  circleImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E74C3C',
  },
  feed: {
    flex: 1,
    marginTop: 0, // Fixed: Removed gap between profile section and feed
  },
  postContainer: {
    marginBottom: 15,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  postUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUserDetails: {
    justifyContent: 'center',
  },
  postUserName: {
    fontWeight: '600',
    fontSize: 14,
  },
  postUserLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  postLocationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 2,
  },
  postCaption: {
    paddingHorizontal: 14,
    paddingBottom: 10,
    fontSize: 13,
    lineHeight: 18,
  },
  readMore: {
    color: '#E74C3C',
    fontWeight: '500',
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  postActions: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButton: {
    marginRight: 15,
  },
  spacer: {
    flex: 1,
  },
  postFooter: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNavItem: {
    alignItems: 'center',
  },
  activeNavText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 2,
  },
  centerNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#f0f0f0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default FitnessSocialApp;