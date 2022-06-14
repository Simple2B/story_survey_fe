import '../styles/main.css'
import { SessionProvider } from "next-auth/react"

// This default export is required in a new `pages/_app.js` file.
// export default function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
