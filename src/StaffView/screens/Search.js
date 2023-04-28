import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Search from '../components/Search'
import MyProduct1 from '../components/MyProductOne'
import { Data } from './MyProduct'
export default function SearchSrc({navigation}) {
  return (
    <View>
     <Search
        placeholder = 'Search In The Shop'
     ></Search>
      <MyProduct1
              source = {Data[0].pic}
              title = {Data[0].name}
              price = {Data[0].price}
              soluongtonkho = {Data[0].ware}
              soluonglove = {Data[0].love}
              soluongview = {Data[0].view}
              soluongban = {Data[0].sold}
              edit = {()=>navigation.navigate('EditProduct')}
              ></MyProduct1>
    </View>
  )
}

const styles = StyleSheet.create({})