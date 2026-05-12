import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import FitnessScreen from '../screens/FitnessScreen';
import FinanceiroScreen from '../screens/FinanceiroScreen';
import AcademicoScreen from '../screens/AcademicoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Fitness"
        component={FitnessScreen}
      />

      <Stack.Screen
        name="Financeiro"
        component={FinanceiroScreen}
      />

      <Stack.Screen
        name="Academico"
        component={AcademicoScreen}
      />
    </Stack.Navigator>
  );
}