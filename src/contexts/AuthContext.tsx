import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '@/types/user.types';
import { AuthContextType, RegisterData } from '@/types/auth.types';
import { storage } from '@/utils/storage';
import { validation } from '@/utils/validation';
import { MOCK_USERS } from '@/data/mockUsers';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredUser();
  }, []);

  async function loadStoredUser() {
    try {
      const storedUser = await storage.getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('E-mail ou senha inválidos');
    }

    await storage.saveUser(foundUser);
    await storage.saveToken('mock-token-' + foundUser.id);
    
    // Define o user (isso automaticamente faz isAuthenticated = true)
    setUser(foundUser);
  }

  async function register(data: RegisterData) {
    // Validações
    if (!validation.email(data.email)) {
      throw new Error('E-mail inválido');
    }

    if (!validation.cpf(data.cpf)) {
      throw new Error('CPF inválido');
    }

    if (!validation.password(data.password)) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }

    if (!validation.passwordsMatch(data.password, data.confirmPassword)) {
      throw new Error('As senhas não coincidem');
    }

    // Verifica se usuário já existe
    const userExists = MOCK_USERS.some(u => u.email === data.email);
    if (userExists) {
      throw new Error('Usuário já cadastrado');
    }

    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      cpf: data.cpf,
      birthDate: data.birthDate,
      phone: data.phone,
      email: data.email,
      password: data.password,
    };

    MOCK_USERS.push(newUser);
    await storage.saveUser(newUser);
    await storage.saveToken('mock-token-' + newUser.id);
    
    setUser(newUser);
  }

  async function logout() {
    await storage.removeUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
