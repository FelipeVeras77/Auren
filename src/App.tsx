import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Hero } from './components/hero/Hero';
import { AccountPanel } from './components/panels/AccountPanel';
import { CartDrawer } from './components/panels/CartDrawer';
import { FavoritesDrawer } from './components/panels/FavoritesDrawer';
import { InfoDialog } from './components/panels/InfoDialog';
import { MobileMenu } from './components/panels/MobileMenu';
import { SearchDialog } from './components/panels/SearchDialog';
import { ToastRegion } from './components/panels/ToastRegion';
import { ProductDialog } from './components/product/ProductDialog';
import { Showcase } from './components/product/Showcase';
import { Campaign } from './components/sections/Campaign';
import { Collections } from './components/sections/Collections';
import { Editorial } from './components/sections/Editorial';
import { Materia } from './components/sections/Materia';
import { Newsletter } from './components/sections/Newsletter';
import { ShopProvider } from './store/ShopContext';

export default function App() {
  return (
    <ShopProvider>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Editorial />
        <Showcase />
        <Materia />
        <Collections />
        <Campaign />
        <Newsletter />
      </main>
      <Footer />

      <CartDrawer />
      <FavoritesDrawer />
      <SearchDialog />
      <AccountPanel />
      <MobileMenu />
      <ProductDialog />
      <InfoDialog />
      <ToastRegion />
    </ShopProvider>
  );
}
