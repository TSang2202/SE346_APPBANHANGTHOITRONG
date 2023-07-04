import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Firestore } from "../../../Firebase/firebase";
import { IC_Back, IC_ShoppingCart } from "../../CustomerView/assets/icons";

import ProductView from "../../CustomerView/components/ProductView";
import SearchInput from "../../CustomerView/components/SearchInput";
import SortDropDown from "../components/SortDropDown";
import CUSTOM_COLOR from "../constants/colors";

function DetailCategory({ navigation, route }) {

    const { category } = route.params

    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [sortType, setSortType] = useState("");


    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
    };
    const handleSort = (type) => {
        setSortType(type);
    };

    const getDataCategory = async () => {

        const q = query(collection(Firestore, "SANPHAM"), where("MaDM", "==", category.MaDM));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            // console.log("Current cities in CA: ", cities.join(", "));

            // const q = query(collection(Firestore, "SANPHAM"), where("MaDM", "==", category.MaDM));
            // const querySnapshot = await getDocs(q);
            // const data = [];

            // querySnapshot.forEach(documentSnapshot => {
            //     data.push({
            //         ...documentSnapshot.data(),
            //     });
            // });
            let sortedItems = data;

            if (sortType === "a-z") {
                sortedItems = data.sort((a, b) => a.TenSP.localeCompare(b.TenSP));
            } else if (sortType === "z-a") {
                sortedItems = data.sort((a, b) => b.TenSP.localeCompare(a.TenSP));
            } else if (sortType === "low-to-high") {
                sortedItems = data.sort((a, b) => a.GiaSP - b.GiaSP);
            } else if (sortType === "high-to-low") {
                sortedItems = data.sort((a, b) => b.GiaSP - a.GiaSP);
            }


            let filteredItems = data;
            if (searchTerm != null) {
                filteredItems = data.filter(item =>
                    item.TenSP.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            else {
                setItems(data);
            }
            setItems(filteredItems);

        });
    };
    useEffect(() => {
        getDataCategory();
    }, []); // Gọi lại hàm getDataCategory khi component được tạo lần đầu

    useEffect(() => {
        getDataCategory();
    }, [searchTerm, sortType]); // Gọi lại hàm getDataCategory mỗi khi searchTerm thay đổi
    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Image
                        source={IC_Back}
                        style={{
                            width: 10,
                            height: 20,
                            margin: 20,

                        }}
                        resizeMode='stretch'
                    />
                </TouchableOpacity>

                <SearchInput
                    onSearch={handleSearch}
                />

                <TouchableOpacity style={{
                    backgroundColor: CUSTOM_COLOR.Mercury,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                    padding: 8,
                    borderRadius: 10
                }}>
                    <Image
                        source={IC_ShoppingCart}
                    />
                </TouchableOpacity>
            </View>

            <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
            }}>
                <Text style={{
                    fontSize: 20,
                    marginHorizontal: 30,
                    fontWeight: 'bold',
                    marginBottom: 10
                }}>{category.TenDM}</Text>

                <Text style={{
                    fontSize: 17,
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                    marginBottom: 0
                }}>{items.length} sản phẩm</Text>
            </View>
            <SortDropDown
                onSelectSort={handleSort}
            />
            <View style={{
                height: '80%'
            }}>
                <FlatList
                    data={items}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                //justifyContent: 'space-around'
                            }}
                            // onPress={() => { navigation.navigate('DetailProduct', { item }) }}
                            >
                                <ProductView
                                    source={item.HinhAnhSP[0]}
                                    title={item.TenSP}
                                    price={item.GiaSP}
                                />
                            </TouchableOpacity>
                        )
                    }}
                    numColumns={2}
                //keyExtractor={(item) => item.MASP}
                />

            </View>
        </View>

    )
}

export default DetailCategory