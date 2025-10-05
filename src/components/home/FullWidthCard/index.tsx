import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FullWidthResource } from '@/types/resource.types';
import { COLORS } from '@/constants/colors';
import { THEME } from '@/constants/theme';

interface FullWidthCardProps {
  resource: FullWidthResource;
  onPress?: () => void;
}

export function FullWidthCard({ resource, onPress }: FullWidthCardProps) {
  const renderIcon = () => {
    if (!resource.icon) return null;

    const iconProps = {
      name: resource.icon as any,
      size: 32,
      color: COLORS.white,
    };

    switch (resource.iconFamily) {
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons {...iconProps} />;
      case 'Ionicons':
      default:
        return <Ionicons {...iconProps} />;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: resource.color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          {renderIcon()}
          <Text style={styles.name}>{resource.name}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {resource.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
    minHeight: 100,
    ...THEME.shadows.sm,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  name: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.white,
    flex: 1,
    marginLeft: THEME.spacing.sm,
  },
  description: {
    fontSize: THEME.fontSize.xs,
    color: COLORS.white,
    opacity: 0.95,
    lineHeight: 16,
  },
});
