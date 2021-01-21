import { useState } from 'react'
const usePaginator = (initPerpage: number = 15) => {
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(initPerpage)
  const [totalPages, setToalPages] = useState(1)
  return {
    page,
    setPage,
    perpage,
    totalPages,
    setToalPages,
  }
}

export default usePaginator
