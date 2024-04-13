/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import React, { constructor, useState } from 'react';
import { Alert, Button, Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function FlexBox(this: any): React.JSX.Element {
  const [timeElapsed, setTimeElapsed] =  useState<Date | null>(null);
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] =  useState<Date | null>(null);
  const [laps, setLaps] = useState<Date[]>([]);
  const lapButton = () => {
    return (
      <TouchableHighlight style={styles.button} underlayColor="gray" onPress={handleLapPress}>
        <Text style={styles.buttonText}>{running ? 'Lap' : 'Reset'}</Text>
      </TouchableHighlight>
    );
  };
  const lapss = () => {
    let shortestTime: number | null = null;
    let longestTime: number | null = null;
  
    laps.forEach(time => {
      const timeInMillis = time.getTime() - startTime!.getTime();
      if (shortestTime === null || timeInMillis < shortestTime) {
        shortestTime = timeInMillis;
      }
      if (longestTime === null || timeInMillis > longestTime) {
        longestTime = timeInMillis;
      }
    });
    const reversedLaps = [...laps].reverse();
    return reversedLaps.map((time, index) => {
      let lapTextColor  = 'white'; 
      const timeInMillis = time.getTime();
      if (shortestTime !== null && longestTime !== null) {
        const lapDuration = timeInMillis - startTime!.getTime();
        if (lapDuration === shortestTime) {
          lapTextColor = 'green'; 
        } else if (lapDuration === longestTime) {
          lapTextColor = 'red'; 
        }
      }
    return (
        <View key={index} style={[styles.lap]}>
          <Text style={{ ...styles.lapText, color: lapTextColor }}>{`Lap ${reversedLaps.length - index}`}</Text>
          <Text style={{ ...styles.lapText, color: lapTextColor }}>{formatTime(time)}</Text>
        </View>
      );
    });
  };
  const startStopButton=()=>
  {
    var style =running? styles.stopButton:styles.startButton;
    return <TouchableHighlight underlayColor="gray" style={[styles.button,style]} onPress={handleStartPress}>
        <Text>
          {running ? 'Stop':'Start'}
        </Text>
    </TouchableHighlight>
  }
  const handleStartPress=()=>
  {
    if(running)
    {
      clearInterval(this.interval);
      setRunning(false);
      return;
    }
    if (!startTime) {
      setStartTime(new Date());
    }
    this.interval=setInterval(()=>{
      if (startTime){
      const currentTime = new Date();
      const elapsedMilliseconds = currentTime.getTime() - startTime.getTime();
      const elapsedDate = new Date(elapsedMilliseconds);
      setTimeElapsed(elapsedDate);
      setRunning(true);
    }
    },30);
  }
  const handleLapPress = () => {
    if (running) {
      if (timeElapsed &&startTime) {
        const lap = new Date(new Date().getTime() - startTime.getTime());
        setStartTime(new Date());
        setLaps(prevLaps => [...prevLaps, lap]);
      }
    } else {
      setStartTime(null); 
      setTimeElapsed(null); 
      setLaps([]); 
    }
  };
  return (
    // eslint-disable-next-line react-native/no-inline-styles  
   
    <View style={styles.container}>
      <View style={styles.header}>
          <View style={styles.timerWrapper}>
                <Text style={styles.timer}>
                    {formatTime(timeElapsed)}
                </Text>
          </View>
          <View style={styles.buttonWrapper}>
            {lapButton()}
            {startStopButton()}
          </View>
      </View> 
      <ScrollView style={styles.footer}>
      <View>
        {lapss()}
      </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  buttonText:
  {
    color:'white',
  },
  container:
  {
    flex:1,
    backgroundColor:'black',
  },
  header:
  {
    flex:1,
  },
  footer:{
    flex:1,
    backgroundColor:'black',
  },
  timerWrapper:
  {
    flex:5,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonWrapper:
  {
    flex:3,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    
  },
  lap: {
    justifyContent:'space-around',
    flexDirection:'row',
    padding:10,
    marginTop:10,
    backgroundColor:'black',
    borderBottomColor:'white',
  },
  button:
  {
    borderWidth:2,
    height:100,
    width:100,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'grey',
  },
  timer:{
    fontSize:60,
    color:'white',
  },
  lapText:{
    fontSize:25,
    color:'white',
    fontWeight:'200',
  },
  startButton:{
    borderColor: 'green',
    backgroundColor:'rgb(50, 117, 85)',
  },
  stopButton:{
    borderColor: 'red',
    backgroundColor:'rgb(197, 74, 85)',
  },
});

export default FlexBox;

