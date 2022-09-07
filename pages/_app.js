import '../styles/globals.css';
import { store, wrapper } from '../store/store.js';
import { Provider } from "react-redux";


function MyApp({ Component, pageProps }) {
  return (
    <div className='root'>
      <Component {...pageProps} />
    </div>
  );
}

export default wrapper.withRedux(MyApp);