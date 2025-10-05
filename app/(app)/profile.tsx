import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { COLORS } from '@/constants/colors';
import { THEME } from '@/constants/theme';

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const credits = 2346; // Mock - depois pode vir do contexto

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name.substring(0, 2).toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.welcomeText}>Bem-vindo(a)</Text>
          <Text style={styles.companyName}>NOME DA EMPRESA</Text>
          <Text style={styles.responsibleName}>Nome do responsável: {user?.name}</Text>
          <Text style={styles.points}>Seus pontos: {credits}</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Editar perfil</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Documentação</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push('/(app)/approved-requests')}
          >
            <Text style={styles.menuText}>Solicitações aprovadas</Text>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Você sabia?</Text>
          <Text style={styles.infoText}>A Ferroport</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: THEME.spacing.md,
  },
  backText: {
    fontSize: 24,
    color: COLORS.primary,
  },
  headerTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.text,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingVertical: THEME.spacing.xl,
    marginBottom: THEME.spacing.md,
  },
  avatarContainer: {
    marginBottom: THEME.spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.primaryLight,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.white,
  },
  welcomeText: {
    fontSize: THEME.fontSize.md,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  companyName: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.text,
    marginBottom: THEME.spacing.sm,
  },
  responsibleName: {
    fontSize: THEME.fontSize.sm,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  points: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.semibold,
    color: COLORS.primary,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    marginBottom: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuText: {
    fontSize: THEME.fontSize.md,
    color: COLORS.text,
  },
  menuArrow: {
    fontSize: THEME.fontSize.lg,
    color: COLORS.textLight,
  },
  infoSection: {
    backgroundColor: COLORS.white,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.md,
  },
  infoTitle: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.text,
    marginBottom: THEME.spacing.sm,
  },
  infoText: {
    fontSize: THEME.fontSize.sm,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  logoutButton: {
    marginHorizontal: THEME.spacing.lg,
    marginVertical: THEME.spacing.xl,
    paddingVertical: THEME.spacing.md,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: THEME.fontSize.md,
    color: COLORS.error,
    fontWeight: THEME.fontWeight.semibold,
  },
});
