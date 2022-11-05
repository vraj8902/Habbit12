import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
//import { Constants } from 'expo';

const {width} = Dimensions.get('window');

const numberToDays = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun',
};

const habits = [
  {
    title: 'Make your bed',
  },
  {title: 'exercise'},
];
export default class App extends Component {
  state = {
    daysLeft: 0,
    remainingDays: [],
  };
  componentDidMount() {
    this.daysLeft();
    setTimeout(() => {
      this?.scrollView?.scrollTo({x: -30});
    }, 1); // scroll view position fix
  }

  daysLeft = () => {
    var remainingDays = [];
    var date = new Date();
    var time = new Date(date.getTime());
    time.setMonth(date.getMonth() + 1);
    time.setDate(0);
    var days =
      time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;
    this.setState({daysLeft: days});
    const tomorrow = new Date();
    remainingDays.push({
      date: tomorrow.getDate(),
      month: tomorrow.getMonth() + 1,
      day: numberToDays[tomorrow.getDay()],
    });
    for (let i = 1; i <= days; i++) {
      tomorrow.setDate(tomorrow.getDate() + 1);
      remainingDays.push({
        date: tomorrow.getDate(),
        month: tomorrow.getMonth() + 1,
        day: numberToDays[tomorrow.getDay()],
        status: Math.round(Math.random()),
      });
    }

    remainingDays = remainingDays.sort(function (a, b) {
      var keyA = new Date(a.date),
        keyB = new Date(b.date);
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    this.setState({remainingDays: remainingDays});
  };
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#242424'}}>
        <View
          style={{
            flex: 0.1,
            backgroundColor: '#242424',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            ref={scrollView => {
              this.scrollView = scrollView;
            }}
            contentContainerStyle={{
              alignItems: 'center',
              marginLeft: width * 0.4,
            }}
            style={styles.container}
            horizontal={true}
            decelerationRate={0}
            snapToInterval={width - 60}
            snapToAlignment={'center'}
            contentInset={{
              top: 0,
              left: 30,
              bottom: 0,
              right: 30,
            }}>
            {this.state.remainingDays.map(day => {
              return (
                <View style={styles.view}>
                  <Text style={{fontSize: 10, color: 'white'}}>{day.day}</Text>
                  <Text style={{fontSize: 10, color: 'white'}}>{day.date}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={{flex: 0.8, backgroundColor: '#242424'}}>
          {habits.map(habit => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  // flex: 1,
                  // backgroundColor: 'red',
                }}>
                <View
                  style={{
                    flex: 0.4,
                    // backgroundColor: 'blue',
                    flexDirection: 'row',
                    // marginTop: 20,
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    size={16}
                    name="progress-clock"
                    color="#5c7a8e"
                    style={{marginLeft: 8}}
                  />
                  <Text style={{color: '#6f99b8', marginLeft: 8}}>
                    {habit.title}
                  </Text>
                </View>
                <View style={{flex: 0.6}}>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    ref={scrollView => {
                      this.scrollView = scrollView;
                    }}
                    contentContainerStyle={{
                      alignItems: 'center',
                      // marginLeft: width * 0.2,
                    }}
                    style={styles.container}
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={width - 60}
                    snapToAlignment={'center'}
                    contentInset={{
                      top: 0,
                      left: 30,
                      bottom: 0,
                      right: 30,
                    }}>
                    {this.state.remainingDays.map(day => {
                      return (
                        <View
                          style={{
                            marginLeft: 15,
                            marginRight: 15,
                            height: 30,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Entypo
                            size={16}
                            name={day.status ? 'check' : 'cross'}
                            color="#5c7a8e"
                            style={{marginLeft: 2}}
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  view: {
    // width: 80,

    marginLeft: 15,
    marginRight: 15,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    //paddingHorizontal : 30
  },
});
