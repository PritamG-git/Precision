import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION } from "../constants";
import { Home } from "../screens/Home/Home";
import HourLogs from "../screens/HourLogs/HourLogs";
import { JobDetails } from "../screens/JobDetail/JobDetails";
import MyJobs from "../screens/MyJobs/MyJobs";
import MyProfile from "../screens/MyProfile/MyProfile";
import { OnGoingJobs } from "../screens/OnGoingJob/OnGoingJobs";
import Settings from "../screens/Settings/Settings";
import ShiftManagementDetails from "../screens/ShiftManagementDetail/ShiftManagementDetails";
import SetStatus from "../screens/SetStatus/SetStatus";
import { CreateShift } from "../screens/CreateShift/CreateShift";
import EditProfile from "../screens/EditProfile/EditProfile";
import EditUserDetail from "../screens/EditUserDetail/EditUserDetail";
import { UploadCert } from "../screens/UploadCert/UploadCert";
import Certificates from "../screens/Certificates/Certificates";
import EditStatus from "../screens/EditStatus/EditStatus";
import Chat from "../screens/Chat/Chat";
import HospitalDetails from "../screens/HospitalDetails/HospitalDetails";
import Notifications from "../screens/Notifications/Notifications";
import AboutUs from "../screens/AboutUs/AboutUs";
import Terms from "../screens/Terms/Terms";
import Privacy from "../screens/Privacy/Privacy";
import ContactUs from "../screens/ContactUs/ContactUs";

const Stack = createStackNavigator();

export function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen
        name={NAVIGATION.mainHome}
        component={Home}
      />
      <Stack.Screen
        name={NAVIGATION.EditUserDetail}
        component={EditUserDetail}
      />
      <Stack.Screen
        name={NAVIGATION.Certificates}
        component={Certificates}
      />
      <Stack.Screen
        component={UploadCert}
        name={NAVIGATION.uploadcert}
      />
      <Stack.Screen
        component={CreateShift}
        name={NAVIGATION.createshift}
      />
      <Stack.Screen
        name={NAVIGATION.ShiftManagementDetails}
        component={ShiftManagementDetails}
      />

      <Stack.Screen
        name={NAVIGATION.SetStatus}
        component={SetStatus}
      />
      <Stack.Screen
        name={NAVIGATION.ongoingjobs}
        component={OnGoingJobs}
      />
      <Stack.Screen
        name={NAVIGATION.jobdetails}
        component={JobDetails}
      />
      <Stack.Screen
        name={NAVIGATION.hourlogs}
        component={HourLogs}
      />
      <Stack.Screen
        name={NAVIGATION.Settings}
        component={Settings}
      />
      <Stack.Screen
        name={NAVIGATION.MyProfile}
        component={MyProfile}
      />
      <Stack.Screen
        name={NAVIGATION.MyJobs}
        component={MyJobs}
      />
      <Stack.Screen
        name={NAVIGATION.EditProfile}
        component={EditProfile}
      />

      <Stack.Screen
        name={NAVIGATION.AboutUs}
        component={AboutUs}
      />
      <Stack.Screen
        name={NAVIGATION.Terms}
        component={Terms}
      />
      <Stack.Screen
        name={NAVIGATION.Privacy}
        component={Privacy}
      />
      <Stack.Screen
        name={NAVIGATION.ContactUs}
        component={ContactUs}
      />

      <Stack.Screen
        name={NAVIGATION.Notifications}
        component={Notifications}
      />

      <Stack.Screen
        name={NAVIGATION.HospitalDetails}
        component={HospitalDetails}
      />
      <Stack.Screen
        name={NAVIGATION.EditStatus}
        component={EditStatus}
      />
      <Stack.Screen
        name={NAVIGATION.Chat}
        component={Chat}
      />
    </Stack.Navigator>
  );
}
