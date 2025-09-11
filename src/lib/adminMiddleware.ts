// adminMiddleware.ts - Simple authentication for admin panel

// In a real application, this would check against a database or authentication service
export const isAdminAuthenticated = () => {
  // For demo purposes, we'll use a simple check
  // In production, you would implement proper authentication
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token') === 'demo_admin_token'
  }
  return false
}

export const loginAdmin = (password: string) => {
  // For demo purposes, we'll use a simple check
  // In production, you would implement proper authentication
  if (password === 'admin123') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', 'demo_admin_token')
    }
    return true
  }
  return false
}

export const logoutAdmin = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token')
  }
}