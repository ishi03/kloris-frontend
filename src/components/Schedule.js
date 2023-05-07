// import React, {useState, useCallback} from 'react';
// import {Agenda} from 'react-native-calendars';
// import {Card, Avatar} from 'react-native-paper';
// import { Text, StyleSheet, View, FlatList, TextInput, TouchableOpacity } from 'react-native';

// // import Typography from '../components/Typography';

// const timeToString = () => {
//   const date = new Date();
//   return date.toISOString().split('T')[0];
// };

// const Schedule = () => {
//   const [items, setItems] = useState({});
//   const [selectedDate, setSelectedDate]=useState(timeToString);
//   const items2 = {
//     "2023-04-28": [{"name": "task-1"},{"name": "task-2"}],
//     "2023-04-30": [{"name": "task-1"},{"name": "task-2"}],
//     "2023-05-01": [{"name": "task-1"},{"name": "task-2"}],
//     "2023-05-02": [{"name": "task-1"}],
//     "2023-05-03": [{"name": "task-1"},{"name": "task-2"}],
//     "2023-05-04": [{"name": "task-1"}],
//   }

//   // const setI2=()=>{
//   // setItems(items2);
//   // }

//   const getMarkedDates = () => {
//     // const { allAgendaDates } = this.props;
//     let markedDates = {};
//     Object.keys(items2).map(date => {
//       markedDates[date] = {
//         marked: true
//       };
//     });

//     return {
//       ...markedDates
//     };
//   };

//   const onUpdateSelectedDate = date => {
//     // const { allAgendaDates } = this.props;

//     setSelectedDate(date);

//     const dates = item2[date];
   
    
//         setItems({[date]: dates});
//   };


//   const renderItem = useCallback((item) => {
//     return (
//       <TouchableOpacity disabled={false} style={{marginRight: 10, marginTop: 17}}>
//         <Card>
//           <Card.Content>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               <Text>{item.name}</Text>
//               <Avatar.Text label="J" />
//             </View>
//           </Card.Content>
//         </Card>
//       </TouchableOpacity>
//     );
//   },[])

//   const renderEmptyDate=()=>{
//     return(
//       <View>
//         <Text>No Tasks for this day!</Text>
//     </View>
//     )
//   }

//   return (
//     <View style={{flex: 1, marginTop: "10%"}}>
//       {/* <Agenda
//         items={items}
//         loadItemsForMonth={setI2}
//         // selected={'2017-05-16'}
//         renderItem={renderItem}
//       /> */}
//       <Agenda
//           selected={selectedDate}
//           items={items}
//           // minDate={minDate}
//           // maxDate={maxDate}
//           markedDates={getMarkedDates}
//           onDayPress={onUpdateSelectedDate}
//           renderItem={renderItem}
//           renderEmptyDate={renderEmptyDate}
//           // rowHasChanged={itemHasBeenUpdated}
//        />
//     </View>
//   );
// };

// export default Schedule;

import React, {useState, useCallback} from 'react';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import { Text, StyleSheet, View, FlatList, TextInput, TouchableOpacity } from 'react-native';

// import Typography from '../components/Typography';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Schedule = () => {
  const [items, setItems] = useState({});
    const renderEmptyDate=()=>{
    return(
      <View>
        <Text>No Tasks for this day!</Text>
    </View>
    )
  }

  // const loadItems = (day) => {
  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = timeToString(time);
  //       if (!items[strTime]) {
  //         items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 3 + 1);
  //         for (let j = 0; j < numItems; j++) {
  //           items[strTime].push({
  //             name: 'Item for ' + strTime + ' #' + j,
  //             height: Math.max(50, Math.floor(Math.random() * 150)),
  //           });
  //         }
  //       }
  //     }
  //     const newItems = {};
  //     Object.keys(items).forEach((key) => {
  //       newItems[key] = items[key];
  //     });
  //     setItems(newItems);
  //     // console.log(items);
  //   }, 1000);
  // };

  const items2 = {
    "2023-05-01": [{"name": "task-1"},{"name": "task-2"}],
    "2023-05-02": [{"name": "task-1"}],
    "2023-05-03": [{"name": "task-1"},{"name": "task-2"}],
    "2023-05-04": [{"name": "task-1"}],
  }

  const setI2=()=>{
  setItems(items2);
  }


  const renderItem = (item) => {
    return (
      <TouchableOpacity disabled={false} style={{marginRight: 10, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>
              <Avatar.Text label="J" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  } //,[])

  return (
    <View style={{flex: 1, marginTop: "10%"}}>
      <Agenda
        items={items}
        loadItemsForMonth={setI2}
        // selected={'2017-05-16'}
        showOnlySelectedDayItems={true}
        renderItem={renderItem}
        theme={{
          // ...calendarTheme,
          // agendaDayTextColor: 'yellow',
          // agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'green',
          selectedDayBackgroundColor: 'green',
          todayTextColor: 'green',
          dotColor:'green',
          // selectedDayTextColor:'red',
        }}
        renderEmptyData={renderEmptyDate}
      />
    </View>
  );
};

export default Schedule;