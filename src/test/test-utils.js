import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
// Aquí podrías importar otros providers, como ThemeProvider

const AllProviders = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options })

// Reexporta todo de RTL
export * from '@testing-library/react'
// Sobrescribe render
export { customRender as render }
