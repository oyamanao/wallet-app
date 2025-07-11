import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, Image, TouchableOpacity, FlatList, Alert, RefreshControl} from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { styles } from '@/assets/styles/home.styles'
import { useTransactions } from '@/hooks/useTransactions'
import { Ionicons } from '@expo/vector-icons'
import {BalanceCard} from '@/components/BalanceCard'
import { SignOutButton } from '@/components/SignOutButton'
import { TransactionItem } from '@/components/TransactionItem'
import  NoTransactionsFound  from '@/components/NoTransactionsFound'
import  PageLoader  from '@/components/PageLoader'

export default function Page() {
  const { user } = useUser()
  const {transactions,summary,isLoading,loadData,deleteTransaction} = useTransactions(user.id)
  const [refreshing,setRefreshing] = React.useState(false)

  const handleDelete = (id) => {
      Alert.alert("Delete Transaction","Are you sure?",[
            {text:"Cancel",style:"cancel"},
            {text:"Delete",style:"destructive",onPress: () => deleteTransaction(id)}
          ])
  }

  const onRefresh = async (params) => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }
  
  useEffect(()=>{
    loadData();
  },[loadData])
  //when data is loading return a page loader
  if(isLoading && !refreshing) return <PageLoader />;

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* LEFT */}
          <View style={styles.headerLeft}>
            <Image 
            source={require("../../assets/images/logo.png")}
            style={styles.headerLogo}
            resizeMode='contain'
            />

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>
          {/* RIGHT */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>

        </View>
        {/* BALANCE CARD */}
        <BalanceCard summary={summary}/>

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

      </View>

      <FlatList
      style={styles.transactionsList}
      contentContainerStyle={styles.transactionsListContent}
      data={transactions}
      //data={[]}
      renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete}/> }
      ListEmptyComponent={<NoTransactionsFound />}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  )
}