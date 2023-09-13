import React, { createContext } from 'react'
import { Layout } from 'antd'
import EditModal from './components/Modal/edit'
import UploadModal from './components/Modal/upload'
import { useQuery } from '@tanstack/react-query'
import API from './API'
import './styles/App.css'
import Header from './components/Layout/header'
import { hookstate } from '@hookstate/core'
import Page from './components/Layout/page'

const defaultContext: DataContext = {
  isLoading: true,
  error: null,
  data: undefined,
}

export const DataContext = createContext<DataContext>(defaultContext)

export const uploadModalState = hookstate(false)
export const editModalState = hookstate({
  isOpen: false,
  src: '',
  date: '',
  _id: '',
})

export default function App() {
  const { isLoading, error, data } = useQuery<Data>({
    queryKey: ['/'],
    queryFn: API.getFiles,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  console.log({ isLoading, error, data })

  return (
    <DataContext.Provider value={{ isLoading, error, data }}>
      <Layout style={{ background: 'var(--white-color)', width: '100%' }}>
        <Header />
        <Page />
        <UploadModal />
        <EditModal />
      </Layout>
    </DataContext.Provider>
  )
}


