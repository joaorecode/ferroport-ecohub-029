import { User } from './user.types';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

export interface RegisterData {
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}
