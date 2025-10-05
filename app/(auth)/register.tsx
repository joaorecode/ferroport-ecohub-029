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
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Loading } from '@/components/common/Loading';
import { formatters } from '@/utils/formatters';
import { COLORS } from '@/constants/colors';
import { THEME } from '@/constants/theme';

export default function Register() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const { register, isAuthenticated } = useAuth();
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

  async function handleRegister() {
    if (!name || !cpf || !birthDate || !phone || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      setIsRegistering(true);
      await register({
        name,
        cpf,
        birthDate,
        phone,
        email,
        password,
        confirmPassword,
      });
      setShowLoading(true);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
      setIsRegistering(false);
    }
  }

  function handleCpfChange(text: string) {
    const formatted = formatters.applyMask('cpf', text);
    setCpf(formatted);
  }

  function handlePhoneChange(text: string) {
    const formatted = formatters.applyMask('phone', text);
    setPhone(formatted);
  }

  function handleDateChange(text: string) {
    const formatted = formatters.applyMask('date', text);
    setBirthDate(formatted);
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
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>
            Preencha os dados para se cadastrar
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Nome Completo"
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Input
            label="CPF"
            placeholder="000.000.000-00"
            value={cpf}
            onChangeText={handleCpfChange}
            keyboardType="numeric"
            maxLength={14}
          />

          <Input
            label="Data de Nascimento"
            placeholder="DD/MM/AAAA"
            value={birthDate}
            onChangeText={handleDateChange}
            keyboardType="numeric"
            maxLength={10}
          />

          <Input
            label="Telefone"
            placeholder="(00) 00000-0000"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
            maxLength={15}
          />

          <Input
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Senha"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Input
            label="Confirmar Senha"
            placeholder="Digite a senha novamente"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Button
            title="Cadastrar"
            onPress={handleRegister}
            loading={isRegistering}
            disabled={isRegistering}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Já possui uma conta?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.loginLink}>Fazer login</Text>
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
    paddingTop: THEME.spacing.xxl,
    paddingBottom: THEME.spacing.xl,
  },
  header: {
    marginBottom: THEME.spacing.xl,
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: THEME.spacing.lg,
  },
  loginText: {
    fontSize: THEME.fontSize.sm,
    color: COLORS.textLight,
  },
  loginLink: {
    fontSize: THEME.fontSize.sm,
    color: COLORS.primary,
    fontWeight: THEME.fontWeight.semibold,
  },
});
