import { useCallback, useEffect, useRef } from 'react'

/* monitor scroll position, call loadNext when hitting bottom */
const InfiniteScroller = (props: {
  children: React.ReactNode
  loading: boolean
  loadNext: () => void
}) => {
  const { children, loading, loadNext } = props
  const scrollListener = useRef(loadNext)

  useEffect(() => {
    scrollListener.current = loadNext
  }, [loadNext])

  const onScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement

    // if scrolltop + clientHeight is equal to scrollHeight
    // and we are not loading already
    if (Math.floor(scrollTop + clientHeight) == scrollHeight && !loading) {
      scrollListener.current()
    }
  }

  /* register scroll event listener */
  useEffect(() => {
    if (typeof window != 'undefined') {
      window.addEventListener('scroll', onScroll)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  return <div className="container">{children}</div>
}

export default InfiniteScroller
