import Layout from "./components/common/Layout";
import { CartContextProvider } from "./components/contexts/CartContext";

function App() {
  return (
    <CartContextProvider>
      <Layout></Layout>
    </CartContextProvider>
  );
}

export default App;
