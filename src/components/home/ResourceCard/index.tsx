import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Resource } from '@/types/resource.types';
import { COLORS } from '@/constants/colors';
import { THEME } from '@/constants/theme';

interface ResourceCardProps {
  resource: Resource;
  onPress?: () => void;
}

export function ResourceCard({ resource, onPress }: ResourceCardProps) {
  const renderIcon = () => {
    if (!resource.icon) return null;

    const iconProps = {
      name: resource.icon as any,
      size: 36,
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
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {resource.name}
        </Text>
        <View style={styles.quantityContainer}>
          <Text style={styles.label}>QTD:</Text>
          <Text style={styles.quantity} numberOfLines={1}>
            {resource.quantity} {resource.unit}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    minHeight: 140,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.sm,
    marginBottom: THEME.spacing.sm,
    ...THEME.shadows.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: THEME.spacing.xs,
  },
  name: {
    fontSize: THEME.fontSize.xs,
    fontWeight: THEME.fontWeight.semibold,
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: THEME.spacing.xs,
  },
  quantityContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 2,
  },
  quantity: {
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.white,
  },
});
