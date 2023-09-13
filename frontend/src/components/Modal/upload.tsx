import React, { useCallback, useState } from 'react'
import { Image, Modal, Space, notification } from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'
import { useDropzone } from 'react-dropzone'
import _ from 'lodash'
import Text from '../Text'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import API from '../../API'
import { useHookstate } from '@hookstate/core'
import { uploadModalState } from '../../App'

interface Dropfile {
  id: number
  src: string | ArrayBuffer | null | undefined
}

function UploadModal() {
  const queryClient = useQueryClient()
  const modal = useHookstate(uploadModalState)
  const [notify, contextHolder] = notification.useNotification()

  const [preview, setPreview] = useState<Dropfile[]>([])

  const mutation = useMutation({
    mutationFn: API.uploadFiles,
    retry: false,
    onSuccess: () => {
      modal.set(false)
      setPreview([])
      queryClient.invalidateQueries({ queryKey: ['/'], refetchType: 'all' })
    },
    onError: openNotification,
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    _.map(acceptedFiles, (file, index) => {
      const reader = new FileReader()
      reader.onload = function (e) {
        setPreview((prevState: Dropfile[]) => [...prevState, { id: index, src: e.target?.result }])
      }
      reader.readAsDataURL(file)

      const data = new FormData()
      data.append('description', '')
      acceptedFiles.forEach((file) => {
        data.append('uploadFiles', file)
      })

      console.log('form data, ', data)

      mutation.mutate(data)

      return file
    })
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 2,
    onDrop,
  })

  return (
    <Modal
      open={modal.get()}
      closeIcon={null}
      className='modal modal--type_upload'
      bodyStyle={{ background: 'transparent' }}
      centered
      footer={null}
    >
      <Space direction='vertical' size={15} {...getRootProps()} style={{ cursor: 'pointer', display: 'flex' }}>
        <input hidden maxLength={6} multiple name='uploadFiles' {...getInputProps()} />
        <CloudDownloadOutlined style={{ fontSize: '65px', color: 'var(--green-color)' }} />
        {_.isEmpty(preview) ? (
          <>
            <Text variant='h1' color='gray-900' text='Upload file' />
            <Text variant='default' color='gray-500' text='Drop your file here to start uploading' />
          </>
        ) : (
          <Space direction='horizontal' size={10}>
            {_.map(preview, (file, idx) => (
              <div className='picture picture--size_auto'>
                <Image src={file.src as string} key={idx} className='image picture__image' preview={false} />
              </div>
            ))}
          </Space>
        )}
      </Space>
      {contextHolder}
    </Modal>
  )

  function openNotification() {
    notify.error({
      description: 'Something really bad happened while uploading your image, please try again ',
      message: 'Sorry, but',
      placement: 'bottomRight',
    })
  }
}

export default UploadModal
