import React from "react";
import {Text,StyleSheet, View} from 'react-native';

//------DisplayCalendarDate-------
/*This displays the current number of dates shown 
    Pre: Date object for the start
    Post: returns an array of Date objects
*/
export const DisplayCalendarDates = (props) => {
 
    //-------toWeekDay-------
    /*Determines the day for example Mon, Tue, ...
        Pre: a integer
        Post: returns a string
    */
    function toWeekDay(day){
        switch(day){
            case 0:
                return "Sun";
            case 1:
                return "Mon";
            case 2:
                return "Tue";
            case 3:
                return "Wed";
            case 4:
                return "Thr";  
            case 5:
                return "Fri";
            case 6:
                return "Sat";
            default: 
                return "error";
        };

    };

    //begins to push on days with date values
    let currentDate = new Date(props.startDate);
    let dateArr = [];
    for(let i = 0; i < 5; i++){
        if(i === 0){
            dateArr.push(
            <>
                
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.weekday}>{toWeekDay(currentDate.getDay()) + "\n"}</Text>
                    <View style={styles.dateStyle}>
                        <Text style={[styles.dateText, {color: 'white'}]}>{currentDate.getDate()}</Text>
                    </View>
                </View>
            </>);
        }
        else{

            dateArr.push(
            <>  
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.weekday}>{toWeekDay(currentDate.getDay()) + "\n"}</Text>
                    <Text style={styles.dateText}>{currentDate.getDate()}</Text>
                </View>
            </>
            );
        }

        console.log(currentDate.getDate());
        currentDate.setDate(currentDate.getDate()+1);
    }
    return dateArr;

};
//------DisplayMonth----
/*Function componet to return month name
    Pre: props with a date object
    Post: returns name of month
*/
export const DisplayMonth = (props) => {
    const months = ["January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", "November", "December"];
    
    return(
        <Text style={styles.month}>{months[new Date(props.startDate).getMonth()]}</Text>
    );
    
};


const styles = StyleSheet.create({
    dateStyle:{ 
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'black',
    },
    dateText:{
        textAlign:'center',
        paddingTop: 5,
    },
    weekday:{
        fontSize: 15,
        color: '#FF8282',
        fontWeight: '500',
    },
    month:{
        fontSize: 20,
        marginBottom: 20,
        letterSpacing: 2,
        fontWeight:"500",
    }
})
