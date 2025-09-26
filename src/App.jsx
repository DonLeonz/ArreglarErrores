import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Api from "./components/Api";
import Menu from "./components/Menu";
import Recomendado from "./components/Recomendado";
import Blog from "./components/Blog";
import Nosotros from "./components/Nosotros";
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router, Route, Routes } from "react-router";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        {/**
                    Se ha eliminado el div que obligaba a todos los elementos
                    a tomar un color oscuro, tener cuidado con esto y utilizar
                    sabiamente el uk-background-secondary (fondo oscuro), el
                    uk-light para obligar a los elementos a ser claros y el
                    uk-dark para obligarlos a ser oscuros

                    ---> AHORA TODOS LOS ESTILOS DEPENDEN DE USTEDES CHICOS
                    No tienen que preocuparse por superestilos
                **/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api" element={<Api />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/suggest" element={<Recomendado />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<Nosotros />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
