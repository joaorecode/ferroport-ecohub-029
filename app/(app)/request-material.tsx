import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from '@/components/common/Button';
import { COLORS } from '@/constants/colors';
import { THEME } from '@/constants/theme';

export default function RequestMaterial() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const materialName = params.name as string || 'Material';
  const materialColor = params.color as string || COLORS.primary;
  const availableQty = params.quantity as string || '1234';
  const iconName = params.icon as string;
  const iconFamily = params.iconFamily as string || 'Ionicons';

  const [quantity, setQuantity] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<'ton' | 'kg'>('ton');

  function handleSubmit() {
    if (!quantity || parseInt(quantity) <= 0) {
      Alert.alert('Erro', 'Informe uma quantidade válida');
      return;
    }

    const requestedQty = parseInt(quantity);
    const available = parseInt(availableQty);

    if (requestedQty > available) {
      Alert.alert('Erro', `Quantidade disponível: ${available} ${selectedUnit}`);
      return;
    }

    Alert.alert(
      'Solicitação Enviada',
      `Sua solicitação de ${quantity} ${selectedUnit} de ${materialName} foi enviada para análise!`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  }

  function incrementQuantity() {
    const current = parseInt(quantity) || 0;
    setQuantity(String(current + 1));
  }

  function decrementQuantity() {
    const current = parseInt(quantity) || 0;
    if (current > 0) {
      setQuantity(String(current - 1));
    }
  }

  const renderIcon = () => {
    if (!iconName) return null;

    const iconProps = {
      name: iconName as any,
      size: 60,
      color: COLORS.white,
    };

    switch (iconFamily) {
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons {...iconProps} />;
      case 'Ionicons':
      default:
        return <Ionicons {...iconProps} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{materialName}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.materialCard, { backgroundColor: materialColor }]}>
          {renderIcon()}
          <Text style={styles.materialName}>{materialName}</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tipo de resíduo:</Text>
            <Text style={styles.infoValue}>resíduo limpo</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Quantidade atual:</Text>
            <Text style={styles.infoValue}>{availableQty} Toneladas</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Créditos:</Text>
            <Text style={styles.infoValue}>90 Tonelada</Text>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formTitle}>{materialName}</Text>
          
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={decrementQuantity}
            >
              <Text style={styles.controlButtonText}>−</Text>
            </TouchableOpacity>
            
            <TextInput
              style={styles.quantityInput}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={COLORS.textLight}
            />
            
            <TouchableOpacity
              style={styles.controlButton}
              onPress={incrementQuantity}
            >
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.unitSelector}>
            <TouchableOpacity
              style={[
                styles.unitButton,
                selectedUnit === 'ton' && styles.unitButtonActive,
              ]}
              onPress={() => setSelectedUnit('ton')}
            >
              <Text
                style={[
                  styles.unitButtonText,
                  selectedUnit === 'ton' && styles.unitButtonTextActive,
                ]}
              >
                Toneladas
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.unitButton,
                selectedUnit === 'kg' && styles.unitButtonActive,
              ]}
              onPress={() => setSelectedUnit('kg')}
            >
              <Text
                style={[
                  styles.unitButtonText,
                  selectedUnit === 'kg' && styles.unitButtonTextActive,
                ]}
              >
                Quilogramas
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Solicitar" onPress={handleSubmit} />
        </View>
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
    padding: THEME.spacing.xs,
  },
  backText: {
    fontSize: 28,
    color: COLORS.primary,
  },
  headerTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: THEME.spacing.lg,
  },
  materialCard: {
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.xl,
    alignItems: 'center',
    marginBottom: THEME.spacing.lg,
    ...THEME.shadows.md,
  },
  materialName: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.white,
    marginTop: THEME.spacing.sm,
  },
  infoSection: {
    backgroundColor: COLORS.white,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: THEME.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: THEME.fontSize.sm,
    color: COLORS.textLight,
  },
  infoValue: {
    fontSize: THEME.fontSize.sm,
    fontWeight: THEME.fontWeight.semibold,
    color: COLORS.text,
  },
  formSection: {
    backgroundColor: COLORS.white,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
  },
  formTitle: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.text,
    marginBottom: THEME.spacing.md,
    textAlign: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: THEME.spacing.lg,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonText: {
    fontSize: 28,
    color: COLORS.text,
    fontWeight: THEME.fontWeight.bold,
  },
  quantityInput: {
    flex: 1,
    height: 50,
    marginHorizontal: THEME.spacing.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: THEME.borderRadius.md,
    textAlign: 'center',
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    color: COLORS.text,
  },
  unitSelector: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
  },
  unitButton: {
    flex: 1,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  unitButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  unitButtonText: {
    fontSize: THEME.fontSize.sm,
    color: COLORS.textLight,
    fontWeight: THEME.fontWeight.medium,
  },
  unitButtonTextActive: {
    color: COLORS.white,
    fontWeight: THEME.fontWeight.semibold,
  },
  buttonContainer: {
    marginTop: THEME.spacing.md,
    marginBottom: THEME.spacing.xl,
  },
});
