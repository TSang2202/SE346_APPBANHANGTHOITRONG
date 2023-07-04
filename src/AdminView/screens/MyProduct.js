import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Firestore } from '../../../Firebase/firebase';
import { SearchIcon } from '../../CustomerView/assets/icons';
import BackTo from '../components/BackTo';
import ButtonDetail from '../components/ButtonDetail';
import MyProduct1 from '../components/MyProductOne';
import SearchButton from '../components/SearchButton';
import Status from '../components/Status';
import CUSTOM_COLOR from '../constants/colors';
export default function MyProduct({navigation}) {
  const [inventory, setinventory] = useState(true);
  const [Out, setOut] = useState(false);
  const [Wait, setWait] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataOnWait, setDataOnWait] = useState([]);
  const [dataOutOfStock, setDataOutOfStock] = useState([]);
  const [dataInventory, setDataInventory] = useState([]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const ConfirmProduct = item => {
    const confirmRef = doc(Firestore, 'SANPHAM', item.MaSP);

    updateDoc(confirmRef, {
      TrangThai: 'Inventory',
    });

    getDadaOnWait();
  };

  const getDadaOnWait = async () => {
    const q = query(
      collection(Firestore, 'SANPHAM'),
      where('TrangThai', '==', 'OnWait'),
    );
    const querySnapshot = await getDocs(q);

    const data = [];

    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      data.push({...doc.data()});
    });

    setDataOnWait(data);
  };

  const getDadaOutOfStock = async () => {
    const q = query(
      collection(Firestore, 'SANPHAM'),
      where('TrangThai', '==', 'OutOfStock'),
    );
    const querySnapshot = await getDocs(q);

    const data = [];

    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      data.push({...doc.data()});
    });

    setDataOutOfStock(data);
  };

  const getDadaInventory = async () => {
    const q = query(
      collection(Firestore, 'SANPHAM'),
      where('TrangThai', '==', 'Inventory'),
    );
    const querySnapshot = await getDocs(q);
  
    const data = [];
  
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      data.push({ ...doc.data() });
    });
  
    let filteredItems = data;
    if (searchTerm != null) {
        filteredItems = data.filter(item =>
        item.TenSP.toLowerCase().includes(searchTerm.toLowerCase())
        ); 
    }
    else {
        setDataInventory(data);
    }
    setDataInventory(filteredItems);
  };
  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Screen A is focused');
      getDadaOnWait();
      getDadaOutOfStock();
      getDadaInventory();
    },);
    getDadaOnWait();
    getDadaOutOfStock();
    getDadaInventory();
    //const interval = setInterval(() => getDadaOnWait(), 5000); // Lặp lại phương thức lấy dữ liệu sau mỗi 5 giây
    // return () => clearInterval(interval); // Xóa interval khi component bị unmount
  },[dataOnWait.length, dataInventory.length, dataOutOfStock.length]);
  useEffect(()=>{
    getDadaInventory();
  }, [searchTerm]);
  if (inventory == true) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: CUSTOM_COLOR.White}}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo
            onPress={() => navigation.navigate('AdminOverView')}
            Info="My Product"
          />
          <SearchButton
            onSearch = {handleSearch}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="My inventory"
            Color={CUSTOM_COLOR.DarkOrange}
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            countProduct={dataInventory.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOut(true), setinventory(false);
            }}
            title="Out of Stock"
            countProduct={dataOutOfStock.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setWait(true), setinventory(false);
            }}
            title="On Wait"
            countProduct={dataOnWait.length}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '85%',
            marginTop: 10,
          }}>
          <View>
            <FlatList
              horizontal="true"
              data={dataInventory}
              renderItem={({item}) => {
                return (
                  <MyProduct1
                    source={item.HinhAnhSP[0]}
                    title={item.TenSP}
                    price={item.GiaSP}
                    soluongtonkho={item.SoLuongSP}
                    soluonglove={item.SoLuotYeuThich}
                    soluongview={item.SoLuotXem}
                    soluongban={item.SoLuongDaBan}
                    edit={() => navigation.navigate('EditProduct', {item})}
                  />
                );
              }}
            />
            <View style={{height: 90}} />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: CUSTOM_COLOR.White,
            paddingBottom: 20,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ButtonDetail
              style={{width: 250}}
              color={CUSTOM_COLOR.DarkOrange}
              title="ADD A NEW PRODUCT"
              onPress={() => navigation.navigate('AddProduct')}
            />
          </View>
        </View>
        <View style={{width: '100%', height: 50}}/>
      </SafeAreaView>
    );
  }
  if (Out == true) {
    return (
      <SafeAreaView style={{backgroundColor: CUSTOM_COLOR.White, flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo
            onPress={() => navigation.navigate('AdminOverView')}
            Info="My Product"
          />
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              source={SearchIcon}
              style={{width: 20, height: 20, marginLeft: '70%', marginTop: 10}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="My invantory"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOut(false), setinventory(true);
            }}
            countProduct={dataInventory.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="Out of Stock"
            countProduct={dataOutOfStock.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setWait(true), setOut(false);
            }}
            title="On Wait"
            countProduct={dataOnWait.length}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '85%',
            marginTop: 10,
          }}>
          <View>
            <FlatList
              horizontal="true"
              data={dataOutOfStock}
              renderItem={({item}) => {
                return (
                  <MyProduct1
                    source={item.HinhAnhSP[0]}
                    title={item.TenSP}
                    price={item.GiaSP}
                    soluongtonkho={item.SoLuongSP}
                    soluonglove={item.SoLuotYeuThich}
                    soluongview={item.SoLuotXem}
                    soluongban={item.SoLuongDaBan}
                    edit={() => navigation.navigate('EditProduct')}
                  />
                );
              }}
            />
            <View style={{height: 90}} />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: CUSTOM_COLOR.White,
            paddingBottom: 20,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ButtonDetail
              style={{width: 250}}
              color={CUSTOM_COLOR.DarkOrange}
              title="ADD A NEW PRODUCT"
              onPress={() => navigation.navigate('AddProduct')}
            />
          </View>
        </View>
        <View style={{width: '100%', height: 50}}/>
      </SafeAreaView>
    );
  }
  if (Wait == true) {
    return (
      <SafeAreaView style={{backgroundColor: CUSTOM_COLOR.White}}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo
            onPress={() => navigation.navigate('AdminOverView')}
            Info="My Product"
          />
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              source={SearchIcon}
              style={{width: 20, height: 20, marginLeft: '70%', marginTop: 10}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="My invantory"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setWait(false), setinventory(true);
            }}
            countProduct={dataInventory.length}
          />
          <Status
            onPress={() => {
              setWait(false), setOut(true);
            }}
            Color={CUSTOM_COLOR.Black}
            title="Out of Stock"
            countProduct={dataOutOfStock.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="On Wait"
            countProduct={dataOnWait.length}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '85%',
            marginTop: 10,
          }}>
          <View>
            <FlatList
              horizontal="true"
              data={dataOnWait}
              renderItem={({item}) => {
                return (
                  <MyProduct1
                    source={item.HinhAnhSP[0]}
                    title={item.TenSP}
                    price={item.GiaSP}
                    soluongtonkho={item.SoLuongSP}
                    soluonglove={item.SoLuotYeuThich}
                    soluongview={item.SoLuotXem}
                    soluongban={item.SoLuongDaBan}
                    type="OnWait"
                    edit={() => navigation.navigate('EditProduct')}
                    confirm={() => ConfirmProduct(item)}
                  />
                );
              }}
            />
            <View style={{height: 90}} />
          </View>
        </View>

        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: CUSTOM_COLOR.White,
            paddingBottom: 20,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ButtonDetail
              style={{width: 250}}
              color={CUSTOM_COLOR.DarkOrange}
              title="ADD A NEW PRODUCT"
              onPress={() => navigation.navigate('AddProduct')}
            />
          </View>
        </View>
        <View style={{width: '100%', height: 50}}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
