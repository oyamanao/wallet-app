import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PropsWithChildren } from 'react'
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';


//type props = PropsWithChildren<{}> ;

const SafeScreen = ({children}) => {
  const insests = useSafeAreaInsets();
  return (
    <View style={{paddingTop:insests.top,paddingBottom:insests.bottom, flex:1, backgroundColor:COLORS.background}}>
      {children}
    </View>
  )
}

export default SafeScreen

const styles = StyleSheet.create({})