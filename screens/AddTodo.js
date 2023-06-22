import DateTimePicker from '@react-native-community/datetimepicker';
import * as React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

export default function AddTodo(){
    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [isToday, setIsToday] = React.useState(false);
    const [show, setShow] = React.useState(false)
    const [hora, setHora] = React.useState();
    const [minutos, setMinutos] = React.useState();

    const onChange = (event, selectedDate) => {
        setShow(!setShow)
        setDate(selectedDate)
        setHora(selectedDate.getHours())
        setMinutos(selectedDate.getMinutes());
    }

    const listTodos = useSelector(state => state.todos.todos)
    const dispath = useDispatch();
    const navigation = useNavigation();

    const addTodo = async () => {
        const newTodo = {
            id: Math.floor(Math.random() * 1000000),
            text: name,
            hour: date.toString(),
            isToday: isToday,
            isComplited: false,
        }
        try {
            await AsyncStorage.setItem("@Todos", JSON.stringify([...listTodos, newTodo]));
            dispath(addTodoReducer(newTodo));
            console.log('Todo saved correctly');
            navigation.goBack();
        }catch (e) {
            console.log(e);
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Add Task</Text>
            <View style={styles.inputCointainer}>
                <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        style={styles.text}
                        placeholder='Task'
                        placeholderTextColor="#00000030"
                        onChangeText={(text) => {setName(text)}}
                    />
            </View>
            <TouchableOpacity onPress={setShow} style={styles.inputCointainer}>
                <Text style={styles.inputTitle}>Hour</Text>
                <Text style={styles.inputTitle}>{
                    hora || minutos ? `${hora}:${minutos}` : '00:00'
                }</Text>
                   
            </TouchableOpacity>
            {show && (
                 <DateTimePicker
                 value={date}
                 mode={'time'}
                 is24Hour={true}
                 onChange={onChange}
                 style={{with:'80%'}}
             />
            )}
            <View style={styles.inputCointainer}>
                <Text style={styles.inputTitle}>Today</Text>
                <Switch
                    value={isToday}
                    onValueChange={(value) => {setIsToday(value)}}
                />
                
            </View>
            <TouchableOpacity style={styles.button} onPress={addTodo} >
                    <Text style={{color: 'white'}}>Done</Text>
            </TouchableOpacity>
            <Text style={{color: '#00000060'}}>If you disable today, the task will be considered as tomorrow</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8Fa',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginTop: 10,
    },
    inputTitle: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24,
    },
    textInput: {
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '80%',
    },
    inputCointainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 30,
    },
    button:{
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        height: 46,
        borderRadius: 11,
    }
})