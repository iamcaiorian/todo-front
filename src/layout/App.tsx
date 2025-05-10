import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '../routes'

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-zinc-900 py-32'>
        <div className='max-w-6xl mx-auto px-4 s  m:px-6 lg:px-8'>
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
