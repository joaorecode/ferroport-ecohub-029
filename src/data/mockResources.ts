import { Resource, FullWidthResource } from '@/types/resource.types';
import { COLORS } from '@/constants/colors';

export const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    name: 'Papel e Papelão',
    color: COLORS.paper,
    quantity: 1234,
    unit: 'ton',
    icon: 'newspaper-outline',
    iconFamily: 'Ionicons',
  },
  {
    id: '2',
    name: 'Plástico/Isopor',
    color: COLORS.plastic,
    quantity: 1234,
    unit: 'ton',
    icon: 'bottle-soda-outline',
    iconFamily: 'MaterialCommunityIcons',
  },
  {
    id: '3',
    name: 'Vidro',
    color: COLORS.glass,
    quantity: 1234,
    unit: 'ton',
    icon: 'bottle-wine-outline',
    iconFamily: 'MaterialCommunityIcons',
  },
  {
    id: '4',
    name: 'Metal',
    color: COLORS.metal,
    quantity: 1234,
    unit: 'ton',
    icon: 'cog-outline',
    iconFamily: 'Ionicons',
  },
  {
    id: '5',
    name: 'Madeira',
    color: COLORS.wood,
    quantity: 1234,
    unit: 'ton',
    icon: 'tree-outline',
    iconFamily: 'MaterialCommunityIcons',
  },
  {
    id: '6',
    name: 'Orgânicos',
    color: COLORS.organic,
    quantity: 1234,
    unit: 'ton',
    icon: 'leaf-outline',
    iconFamily: 'Ionicons',
  },
];

export const MOCK_FULL_WIDTH_RESOURCES: FullWidthResource[] = [
  {
    id: '7',
    name: 'Lixo Eletrônico',
    color: COLORS.electronic,
    description: 'Computadores, celulares, tablets, TVs, monitores e componentes eletrônicos',
    icon: 'laptop-outline',
    iconFamily: 'Ionicons',
  },
  {
    id: '9',
    name: 'Resíduo Perigoso',
    color: COLORS.hazardous,
    description: 'Materiais contaminados com óleo, graxa, solventes, tintas e produtos químicos',
    icon: 'warning-outline',
    iconFamily: 'Ionicons',
  },
  {
    id: '8',
    name: 'Maquinário',
    color: COLORS.machinery,
    description: 'Equipamentos industriais, máquinas pesadas e ferramentas de grande porte',
    icon: 'construct-outline',
    iconFamily: 'Ionicons',
  },
];
