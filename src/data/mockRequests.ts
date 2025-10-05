import { ApprovedRequest } from '@/types/resource.types';

export const MOCK_APPROVED_REQUESTS: ApprovedRequest[] = [
  {
    id: '1',
    resourceName: 'Papel e Papelão',
    quantity: 25,
    unit: 'toneladas',
    date: '28/09/2025',
    status: 'approved',
  },
  {
    id: '2',
    resourceName: 'Plástico/Isopor',
    quantity: 15,
    unit: 'toneladas',
    date: '25/09/2025',
    status: 'approved',
  },
  {
    id: '3',
    resourceName: 'Metal',
    quantity: 30,
    unit: 'toneladas',
    date: '20/09/2025',
    status: 'approved',
  },
  {
    id: '4',
    resourceName: 'Vidro',
    quantity: 20,
    unit: 'toneladas',
    date: '15/09/2025',
    status: 'approved',
  },
];
