import { Provider } from 'react-redux';
import { SessionProvider } from "next-auth/react";
import { useStore } from '../redux/store';
import '../styles/main.css';

// This default export is required in a new `pages/_app.js` file.
// export default function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}
