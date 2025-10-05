import { User } from '@/types/user.types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'João Silva',
    cpf: '123.456.789-00',
    birthDate: '15/05/1990',
    phone: '(11) 98765-4321',
    email: 'joao@ferroport.com',
    password: '123456',
    credits: 2346,
    companyName: 'Empresa Exemplo LTDA',
  },
  {
    id: '2',
    name: 'Maria Santos',
    cpf: '987.654.321-00',
    birthDate: '22/08/1985',
    phone: '(11) 91234-5678',
    email: 'maria@ferroport.com',
    password: '123456',
    credits: 1580,
    companyName: 'Santos & Cia',
  },
];
