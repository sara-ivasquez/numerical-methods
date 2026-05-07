import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Methods from './pages/Methods'
import Bisection from './pages/methods/Bisection'
import RegulaFalsi from './pages/methods/RegulaFalsi'
import FixedPoint from './pages/methods/FixedPoint'
import NewtonRaphson from './pages/methods/NewtonRaphson'
import Secant from './pages/methods/Secant'
import MultipleRoots1 from './pages/methods/MultipleRoots1'
import MultipleRoots2 from './pages/methods/MultipleRoots2'
import Jacobi from './pages/methods/Jacobi'
import GaussSeidel from './pages/methods/GaussSeidel'
import SOR from './pages/methods/SOR'
import Vandermonde from './pages/methods/Vandermonde'
import NewtonInterpolation from './pages/methods/NewtonInterpolation'
import Lagrange from './pages/methods/Lagrange'
import SplineLinear from './pages/methods/SplineLinear'
import SplineCubic from './pages/methods/SplineCubic'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/"                  element={<Home />} />
          <Route path="/methods"           element={<Methods />} />
          <Route path="/about"             element={<About />} />
          <Route path="/methods/bisection" element={<Bisection />} />
          <Route path="/methods/regula-falsi" element={<RegulaFalsi />} />
          <Route path="/methods/fixed-point" element={<FixedPoint />} />
          <Route path="/methods/newton-raphson" element={<NewtonRaphson />} />
          <Route path="/methods/secant" element={<Secant />} />
          <Route path="/methods/multiple-roots-1" element={<MultipleRoots1 />} />
          <Route path="/methods/multiple-roots-2" element={<MultipleRoots2 />} />
          <Route path="/methods/jacobi" element={<Jacobi />} />
          <Route path="/methods/gauss-seidel" element={<GaussSeidel />} />
          <Route path="/methods/sor" element={<SOR />} />
          <Route path="/methods/vandermonde" element={<Vandermonde />} />
          <Route path="/methods/newton-interpolation" element={<NewtonInterpolation />} />
          <Route path="/methods/lagrange" element={<Lagrange />} />
          <Route path="/methods/spline-linear" element={<SplineLinear />} />
          <Route path="/methods/spline-cubic" element={<SplineCubic />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}