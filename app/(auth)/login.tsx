import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Loading } from '@/components/common/Loading';
import ASSETS from '@/constants/assets';
import { COLORS } from '@/constants/colors';
import { THEME } from '@/constants/theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && showLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        router.replace('/(app)/home');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, showLoading]);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      setIsLoggingIn(true);
      await login(email, password);
      setShowLoading(true);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
      setIsLoggingIn(false);
    }
  }

  function handleRegister() {
    router.push('/(auth)/register');
  }

  function handleForgotPassword() {
    Alert.alert(
      'Recuperar Senha',
      'Funcionalidade em desenvolvimento. Entre em contato com o suporte.',
    );
  }

  if (showLoading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={ASSETS.logo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="E-mail ou Username"
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>recuperar senha?</Text>
          </TouchableOpacity>

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={isLoggingIn}
            disabled={isLoggingIn}
          />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Não possui uma conta? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: THEME.spacing.lg,
    paddingTop: THEME.spacing.xxl * 2,
    paddingBottom: THEME.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: THEME.spacing.xl,
  },
  logoContainer: {
    width: 350,
    height: 175,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: THEME.spacing.lg,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: THEME.fontSize.xxl,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.primary,
    marginBottom: THEME.spacing.xs,
  },
  subtitle: {
    fontSize: THEME.fontSize.md,
    color: COLORS.textLight,
  },
  form: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -THEME.spacing.sm,
    marginBottom: THEME.spacing.md,
  },
  forgotPasswordText: {
    fontSize: THEME.fontSize.xs,
    color: COLORS.textLight,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: THEME.spacing.lg,
  },
  registerText: {
    fontSize: THEME.fontSize.sm,
    color: COLORS.textLight,
  },
  registerLink: {
    fontSize: THEME.fontSize.sm,
    color: COLORS.primary,
    fontWeight: THEME.fontWeight.semibold,
  },
});
