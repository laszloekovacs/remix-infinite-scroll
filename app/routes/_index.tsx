import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import type { Data } from './api.server'
import { fetchItems } from './api.server'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'remix-infinite-scroll' },
    { name: 'description', content: 'infinite scrolling with fetcher!' },
  ]
}

export const loader = async (context: LoaderFunctionArgs) => {
  const url = new URL(context.request.url)
  const page = url.searchParams.get('page') || 0

  const items = await fetchItems({ page: Number(page) })

  return Promise.resolve(items)
}

export default function Index() {
  const initialItems = useLoaderData<typeof loader>()
  const [items, setItems] = useState<Data[]>(initialItems.data)

  return (
    <div>
      {items.map((item) => (
        <img key={item.id} src={item.thumb} alt={item.thumb} />
      ))}
    </div>
  )
}
