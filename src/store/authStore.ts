import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { AuthState, User } from '../types';

// Mock users database (in real app, this would be API calls)
const mockUsers: User[] = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@example.com',
    createdAt: new Date()
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Mock authentication - in real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        if (email === 'demo@example.com' && password === 'password') {
          const user = mockUsers.find(u => u.email === email);
          if (user) {
            set({ user, isAuthenticated: true });
            return true;
          }
        }
        
        // Check if user exists in localStorage (for registered users)
        const storedUsers = JSON.parse(localStorage.getItem('registered-users') || '[]');
        const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password);
        
        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return true;
        }
        
        return false;
      },
      
      register: async (username: string, email: string, password: string) => {
        // Mock registration - in real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        // Check if user already exists
        const storedUsers = JSON.parse(localStorage.getItem('registered-users') || '[]');
        const existingUser = storedUsers.find((u: any) => u.email === email);
        
        if (existingUser) {
          return false; // User already exists
        }
        
        const newUser: User & { password: string } = {
          id: uuidv4(),
          username,
          email,
          password,
          createdAt: new Date()
        };
        
        // Store user in localStorage (in real app, this would be sent to backend)
        storedUsers.push(newUser);
        localStorage.setItem('registered-users', JSON.stringify(storedUsers));
        
        const { password: _, ...userWithoutPassword } = newUser;
        set({ user: userWithoutPassword, isAuthenticated: true });
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);