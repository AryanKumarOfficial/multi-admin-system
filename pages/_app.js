import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MagnifyingGlass from '@/components/Loader';
import LoadingBar from 'react-top-loading-bar';
import AdminNav from '@/components/AdminNav';

export default function App({ Component,
  pageProps: { session, ...pageProps } }) {
  const [Loader, setLoader] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter();
  useEffect(() => {

    if (router.pathname.includes('/admin/dashboard')) {
      setIsAdmin(true)
    }

    router.events.on('routeChangeComplete', () => {
      setLoader(false)
      setProgress(100)
    }
    )
    router.events.on('routeChangeStart', () => {
      setLoader(true)
      setProgress(40)
    }
    )
    return () => {
      router.events.off('routeChangeComplete', () => {
        setLoader(false)
      }
      )
      router.events.off('routeChangeStart', () => {
        setLoader(true)
      }
      )
    }
  }
    , [router.events])

  return <>
    <SessionProvider session={session}>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {Loader ? <div className="text-center flex justify-center absolute top-[50%] left-[50%]" style={{
        transform: 'translate(-50%,-50%)'
      }}>
        <MagnifyingGlass />
      </div> : <>
        {isAdmin ? <AdminNav />
          :
          <Navbar />
        }
        <Component {...pageProps} />
      </>
      }
    </SessionProvider>
  </>
}
