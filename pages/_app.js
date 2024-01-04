import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} style={{ padding: 0 }} />
}

export default MyApp
