export type Data = { id: number; thumb: string }
export type ItemsResponse = { data: Data[]; page: number }

const PER_PAGE = 20

export const fetchItems = async (query: {
  page: number
}): Promise<ItemsResponse> => {
  const start = query.page * PER_PAGE

  /* generate id's that are continous */
  const items = Array.from({ length: PER_PAGE }, (_, i) => i + start).map(
    (id) => ({
      id,
      thumb: `https://picsum.photos/200?${id}`,
    })
  )

  /* fake delay */
  await new Promise((r) => setTimeout(r, 500))

  return Promise.resolve({
    data: items,
    page: query.page,
  })
}
