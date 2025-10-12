import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const root = createRoot(document.getElementById('root'))

class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught error:', error, info)
    this.setState({ info })
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, fontFamily: 'ui-sans-serif, system-ui' }}>
          <div style={{ marginBottom: 8, color: '#b91c1c' }}>[ErrorBoundary] Houve um erro ao renderizar o app.</div>
          {this.state.error ? (
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12, background: '#fff1f2', padding: 12, borderRadius: 6, color: '#7f1d1d' }}>
{String(this.state.error)}
{this.state.info?.componentStack ? '\n' + this.state.info.componentStack : ''}
            </pre>
          ) : null}
          <div style={{ marginTop: 12, fontSize: 12, color: '#475569' }}>Atualize a página após correção. Se preferir, me envie o erro acima.</div>
        </div>
      )
    }
    return (
      <React.Suspense fallback={<div style={{ padding: 20 }}>[Suspense] Carregando UI…</div>}>
        {this.props.children}
      </React.Suspense>
    )
  }
}

console.debug('[Boot] Mounting React App')
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
console.debug('[Boot] React App mounted')
