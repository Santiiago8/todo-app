import * as React from 'react';
//import { todosData } from '../data/ToDos'; quitamos la importacion local
import { FlatList, Text, View } from 'react-native';
import Todo from './Todo';

export default function TodoList( {todosData} ) {//recibe los TDdata como propiedad para renderizar los todos que queramos enviarles en cualquier momento
    return  (
        <FlatList
            data={todosData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Todo {...item}/>}
        />
    )
}