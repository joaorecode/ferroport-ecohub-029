export interface Resource {
  id: string;
  name: string;
  color: string;
  quantity: number;
  unit: string;
  icon?: string;
  iconFamily?: 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'FontAwesome';
}

export interface FullWidthResource {
  id: string;
  name: string;
  color: string;
  description: string;
  icon?: string;
  iconFamily?: 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'FontAwesome';
}

export interface ApprovedRequest {
  id: string;
  resourceName: string;
  quantity: number;
  unit: string;
  date: string;
  status: 'approved';
}
