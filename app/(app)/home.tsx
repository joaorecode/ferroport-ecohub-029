import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { WelcomeHeader } from '@/components/home/WelcomeHeader';
import { ResourceCard } from '@/components/home/ResourceCard';
import { FullWidthCard } from '@/components/home/FullWidthCard';
import { Button } from '@/components/common/Button';
import { MOCK_RESOURCES, MOCK_FULL_WIDTH_RESOURCES } from '@/data/mockResources';
import { COLORS } from '@/constants/colors';
import { THEME } from '@/constants/theme';

export default function Home() {
  const router = useRouter();

  function handleApprovedRequests() {
    router.push('/(app)/approved-requests');
  }

  function handleResourcePress(resource: any) {
    router.push({
      pathname: '/(app)/request-material',
      params: {
        name: resource.name,
        color: resource.color,
        quantity: resource.quantity,
        icon: resource.icon,
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <WelcomeHeader />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.buttonContainer}>
          <Button
            title="Solicitações Aprovadas"
            onPress={handleApprovedRequests}
            variant="secondary"
          />
        </View>

        <Text style={styles.sectionTitle}>Insumos Disponíveis</Text>

        <View style={styles.resourcesGrid}>
          {MOCK_RESOURCES.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onPress={() => handleResourcePress(resource)}
            />
          ))}
        </View>

        <View style={styles.fullWidthContainer}>
          {MOCK_FULL_WIDTH_RESOURCES.map((resource) => (
            <FullWidthCard
              key={resource.id}
              resource={resource}
              onPress={() => handleResourcePress(resource)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: THEME.spacing.md, // Reduzido de lg para md
    paddingBottom: THEME.spacing.xl,
  },
  buttonContainer: {
    marginBottom: THEME.spacing.md, // Reduzido de lg para md
  },
  sectionTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.text,
    marginBottom: THEME.spacing.md,
    marginTop: THEME.spacing.sm,
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fullWidthContainer: {
    marginTop: THEME.spacing.sm,
  },
});
