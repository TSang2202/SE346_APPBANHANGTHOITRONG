import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddAccount from '../screens/AddAccount';
import AddProduct from '../screens/AddProduct';
import AddPromotion from '../screens/AddPromotion';
import AdminOverView from '../screens/AdminOverView';
import Chat from '../screens/Chat';
import ChatScreenStaff from '../screens/ChatScreenStaff';
import DeTailDelivery from '../screens/DeTailDelivery';
import DeTailsChat from '../screens/DeTailsChat';
import EditAccount from '../screens/EditAccount';
import EditProduct from '../screens/EditProduct';
import ImportProduct from '../screens/ImportProduct';
import ManageUser from '../screens/ManageUser';
import MyProduct from '../screens/MyProduct';
import Notification from '../screens/Notification';
import Order from '../screens/Order';
import Promotion from '../screens/Promotion';
import Report from '../screens/Report';
import ReviewScreen from '../screens/ReView';
import SearchSrc from '../screens/Search';
import Setting from '../screens/Setting';
import ViewShop1 from '../screens/ViewShop1';
import ViewShop2 from '../screens/ViewShop2';
import ChangeProfile from '../screens/ChangeProfile';
import ChangePassword from '../screens/ChangePassword';

const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AdminOverView"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AddAccount" component={AddAccount} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="AddPromotion" component={AddPromotion} />
      <Stack.Screen name="AdminOverView" component={AdminOverView} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChatScreenStaff" component={ChatScreenStaff} />
      <Stack.Screen name="DeTailDelivery" component={DeTailDelivery} />
      <Stack.Screen name="DeTailsChat" component={DeTailsChat} />
      <Stack.Screen name="EditAccount" component={EditAccount} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
      <Stack.Screen name="ImportProduct" component={ImportProduct} />
      <Stack.Screen name="ManageUser" component={ManageUser} />
      <Stack.Screen name="MyProduct" component={MyProduct} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Promotion" component={Promotion} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="SearchSrc" component={SearchSrc} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="ViewShop1" component={ViewShop1} />
      <Stack.Screen name="ViewShop2" component={ViewShop2} />
      <Stack.Screen name="ChangeProfile" component={ChangeProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}

const AdminNavigationContainer = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AdminNavigationContainer;
