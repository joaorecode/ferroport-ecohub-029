export interface User {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  email: string;
  password: string;
  credits?: number; // NOVO
  companyName?: string; // NOVO
}

export interface LoginCredentials {
  email: string;
  password: string;
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
