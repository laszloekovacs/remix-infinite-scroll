import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import type { Data, ItemsResponse } from './api.server'
import { fetchItems } from './api.server'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import InfiniteScroller from '~/InfiniteScroller'
import Loader from '~/Loader'

export const meta: MetaFunction = () => {
  return [
    { title: 'remix-infinite-scroll' },
    { name: 'description', content: 'infinite scrolling with fetcher!' },
  ]
}

export const loader = async (context: LoaderFunctionArgs) => {
  const url = new URL(context.request.url)
  console.log(url.searchParams.get('page'))
  const page = url.searchParams.get('page') || 0

  const items = await fetchItems({ page: Number(page) })

  return items
}

export default function Index() {
  const initialItems = useLoaderData<ItemsResponse>()
  const fetcher = useFetcher<ItemsResponse>()

  const [items, setItems] = useState<Data[]>(initialItems.data)

  useEffect(() => {
    if (!fetcher.data || fetcher.state == 'loading') {
      return
    }

    if (fetcher.data) {
      const newItems = fetcher.data.data
      setItems((p) => [...p, ...newItems])
    }
  }, [fetcher.data, fetcher.state])

  return (
    <div>
      <Loader isPending={fetcher.state == 'loading'} />
      <h1>remix infinite scroller galery</h1>
      <InfiniteScroller
        loading={fetcher.state == 'loading'}
        loadNext={() => {
          const page = fetcher.data
            ? fetcher.data.page + 1
            : initialItems.page + 1

          const query = `?index&page=${page}`
          fetcher.load(query)

          console.log(`load next page ${page}`)
        }}
      >
        {items.map((item) => (
          <img
            className="thumbnail"
            key={item.id}
            src={item.thumb}
            alt={item.thumb}
          />
        ))}
      </InfiniteScroller>
    </div>
  )
}
