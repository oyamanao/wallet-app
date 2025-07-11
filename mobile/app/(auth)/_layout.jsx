import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import PageLoader from '@/components/PageLoader';

export default function AuthRoutesLayout() {
  const { isSignedIn , isLoaded } = useAuth()

  if (!isLoaded) return <PageLoader/>;

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return <Stack screenOptions={{headerShown:false}} />
}