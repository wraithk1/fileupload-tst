import React from 'react'
import { Button, Image, Space } from 'antd'
import { DownloadOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import API from '../../API'
import { useHookstate } from '@hookstate/core'
import { editModalState } from '../../App'
import { getFilePathBackend, getFormatedDate } from '../../utils'

interface Props {
  item: MyFile
}

function Picture({item}: Props) {
  const modal = useHookstate(editModalState)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: API.deleteFile,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/'], refetchType: 'all' })
    },
  })

  return (
    <div className='picture picture--size_auto'>
      <span className='picture__label text-small'>
        {item.description || getFormatedDate(item.createdAt)}
      </span>
      <div className='picture__wrap' style={{ borderRadius: '10px' }}>
        <Image src={getFilePathBackend(item.pictureName)} preview={false} className='image picture__image' />
        <Space direction='vertical' size={5} className='picture__actions'>
          <Button
            className='text-large'
            style={{ color: 'var(--yellow-color)' }}
            type='text'
            icon={<DownloadOutlined />}
          >
            Download
          </Button>
          <Button
            className='text-large'
            style={{ color: 'var(--yellow-color)' }}
            type='text'
            icon={<FormOutlined />}
            onClick={() => {
              modal.set({
                ...modal.get(),
                src: getFilePathBackend(item.pictureName),
                date: item.createdAt,
                _id: item._id,
              })
              modal.set({ ...modal.get(), isOpen: true })
            }}
          >
            Edit label
          </Button>
          <Button
            className='text-large'
            style={{ color: 'var(--yellow-color)' }}
            type='text'
            icon={<DeleteOutlined />}
            onClick={() => {
              mutation.mutate({ _id: item._id })
            }}
          >
            Delete
          </Button>
        </Space>
      </div>
    </div>
  )
}

export default Picture
