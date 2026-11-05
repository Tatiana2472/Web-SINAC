/**
 * dbService.ts
 * Servicio de conexión a la Base de Datos del SINAC para el frontend React.
 * Soporta conexión con API REST Backend (Express/SQLite) y respaldo persistente en LocalStorage.
 */

export interface Reservacion {
  id?: number;
  codigo_reserva?: string;
  parque_id: string;
  nombre_visitante: string;
  email_visitante: string;
  telefono_visitante?: string;
  cantidad_visitantes: number;
  fecha_visita: string;
  monto_total?: number;
  estado?: string;
  created_at?: string;
}

// Ruta relativa: funciona en localhost:3001 y en Laravel Cloud (mismo dominio)
const API_BASE_URL = '/api';
const LOCAL_STORAGE_KEY = 'sinac_reservaciones_db';

export const dbService = {
  /**
   * Guarda una nueva reservación en la Base de Datos.
   */
  async createReservation(data: Omit<Reservacion, 'id' | 'codigo_reserva' | 'created_at'>): Promise<Reservacion> {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status} al guardar la reservación`);
    }

    const result = await response.json();
    this.saveToLocalStorage(result.data);
    return result.data;
  },

  /**
   * Obtiene todas las reservaciones guardadas en la Base de Datos.
   */
  async getReservations(): Promise<Reservacion[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`);
      if (response.ok) {
        const result = await response.json();
        return result.data;
      }
    } catch (error) {
      console.warn('[DB Service] Leyendo de almacenamiento local:', error);
    }

    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localData ? JSON.parse(localData) : [];
  },

  /**
   * Método auxiliar interno para persistencia local.
   */
  saveToLocalStorage(newRes: Reservacion) {
    const existing = this.getLocalReservations();
    existing.unshift(newRes);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  },

  getLocalReservations(): Reservacion[] {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localData ? JSON.parse(localData) : [];
  }
};