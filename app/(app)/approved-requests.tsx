import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MOCK_APPROVED_REQUESTS } from '@/data/mockRequests';
import { COLORS } from '@/constants/colors';
import { THEME } from '@/constants/theme';

export default function ApprovedRequests() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Solicitações Aprovadas</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_APPROVED_REQUESTS.map((request) => (
          <View key={request.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.resourceName}>{request.resourceName}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Aprovado</Text>
              </View>
            </View>
            
            <View style={styles.cardContent}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Quantidade:</Text>
                <Text style={styles.value}>
                  {request.quantity} {request.unit}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Data:</Text>
                <Text style={styles.value}>{request.date}</Text>
              </View>
            </View>
          </View>
        ))}

        {MOCK_APPROVED_REQUESTS.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Nenhuma solicitação aprovada no momento
            </Text>
          </View>
        )}
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
    backgroundColor: COLORS.white,
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    paddingVertical: THEME.spacing.sm,
  },
  backText: {
    fontSize: THEME.fontSize.md,
    color: COLORS.primary,
    fontWeight: THEME.fontWeight.medium,
  },
  title: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.text,
    marginTop: THEME.spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: THEME.spacing.lg,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.md,
    ...THEME.shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  resourceName: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.semibold,
    color: COLORS.text,
    flex: 1,
  },
  badge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.sm,
  },
  badgeText: {
    fontSize: THEME.fontSize.xs,
    fontWeight: THEME.fontWeight.semibold,
    color: COLORS.white,
  },
  cardContent: {
    gap: THEME.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: THEME.fontSize.sm,
    color: COLORS.textLight,
  },
  value: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.medium,
    color: COLORS.text,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: THEME.spacing.xxl * 2,
  },
  emptyText: {
    fontSize: THEME.fontSize.md,
    color: COLORS.textLight,
    textAlign: 'center',
  },
});
