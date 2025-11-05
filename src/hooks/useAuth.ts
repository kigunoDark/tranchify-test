import { useState, useCallback } from 'react'

const AUTH_KEY = import.meta.env.AUTH_KEY

/**
 * Custom React hook for handling simple authentication state using localStorage.
 *
 * @returns {{
 *   isAuthenticated: boolean;
 *   login: () => void;
 *   logout: () => void;
 * }} An object containing the authentication state and functions to log in and log out.
 * 
 */

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === 'true'
  })

  /**
   * Logs in the user by setting the auth key in localStorage
   * and updating the state.
   */
  const login = useCallback(() => {
    localStorage.setItem(AUTH_KEY, 'true')
    setIsAuthenticated(true)
  }, [])

  /**
   * Logs out the user by removing the auth key from localStorage
   * and updating the state.
   */
  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
  }, [])

  return { isAuthenticated, login, logout }
}
