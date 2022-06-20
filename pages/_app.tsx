import { Provider } from 'react-redux';
import { SessionProvider } from "next-auth/react";
import { useStore } from '../redux/store';
import '../styles/main.css';


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
