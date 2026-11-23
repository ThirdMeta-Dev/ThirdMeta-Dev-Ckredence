import { Header, Opening } from './components/Opening';
import { Strategies, Metrics, Manager } from './components/Investments';
import Services from './components/Services';
import {
  MutualFundApp,
  Blogs,
  Awards,
  Communities,
  Faq,
  Testimonials,
} from './components/Resources';
import { Expert, Complaints, Footer } from './components/Closing';
import './design-tokens.css';
import './homepage.css';
import './sections.css';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Opening />
        <Services />
        <Strategies />
        <Metrics />
        <Manager />
        <MutualFundApp />
        <Blogs />
        <Awards />
        <Communities />
        <Faq />
        <Testimonials />
        <Expert />
        <Complaints />
      </main>
      <Footer />
    </>
  );
}
