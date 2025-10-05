import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS } from '@/constants/colors';
import { THEME } from '@/constants/theme';

export function WelcomeHeader() {
  const { user } = useAuth();
  const router = useRouter();

  const getCompanyName = () => {
    return user?.companyName || 'NOME DA EMPRESA';
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.greeting}>Bem-vindo</Text>
        <Text style={styles.companyName}>{getCompanyName()}</Text>
        <Text style={styles.credits}>Seus créditos: {user?.credits || 0}</Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push('/(app)/profile')}
        style={styles.avatarButton}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name.substring(0, 2).toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  leftContent: {
    flex: 1,
  },
  greeting: {
    fontSize: THEME.fontSize.sm,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  companyName: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.primary,
    marginBottom: 4,
  },
  credits: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
    color: COLORS.text,
  },
  avatarButton: {
    marginLeft: THEME.spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.white,
  },
});
