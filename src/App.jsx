import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import PieceParPiece from "@/pages/PieceParPiece";
import Trouvailles from "@/pages/Trouvailles";
import Inspirations from "@/pages/Inspirations";
import InspirationDetail from "@/pages/InspirationDetail";
import ProduitDetail from "@/pages/ProduitDetail";
import APropos from "@/pages/APropos";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/piece-par-piece" element={<PieceParPiece />} />
          <Route path="/trouvailles" element={<Trouvailles />} />
          <Route path="/inspirations" element={<Inspirations />} />
          <Route path="/inspirations/:id" element={<InspirationDetail />} />
          <Route path="/produits/:id" element={<ProduitDetail />} />
          <Route path="/a-propos" element={<APropos />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
