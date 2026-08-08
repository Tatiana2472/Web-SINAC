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

const API_BASE_URL = 'http://localhost:3001/api';
const LOCAL_STORAGE_KEY = 'sinac_reservaciones_db';

export const dbService = {
  /**
   * Guarda una nueva reservación en la Base de Datos.
   */
  async createReservation(data: Omit<Reservacion, 'id' | 'codigo_reserva' | 'created_at'>): Promise<Reservacion> {
    try {
      // Intentar enviar al backend Express API
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        this.saveToLocalStorage(result.data);
        return result.data;
      }
    } catch (error) {
      console.warn('[DB Service] Servidor backend no detectado. Guardando en almacenamiento de base de datos local.', error);
    }

    // Fallback: Guardar en almacenamiento persistente local de la base de datos
    const localReservation: Reservacion = {
      ...data,
      id: Date.now(),
      codigo_reserva: `SINAC-${Math.floor(100000 + Math.random() * 900000)}`,
      monto_total: data.cantidad_visitantes * 800,
      estado: 'Confirmada',
      created_at: new Date().toISOString(),
    };

    this.saveToLocalStorage(localReservation);
    return localReservation;
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
      console.warn('[DB Service] Leyendo de base de datos local:', error);
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
