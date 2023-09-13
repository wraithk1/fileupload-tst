import React, { useState } from 'react'
import { Image, Input, Modal, Space } from 'antd'
import Btn from '../Button'
import Text from '../Text'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import API from '../../API'
import { useHookstate } from '@hookstate/core'
import { editModalState } from '../../App'

function EditModal() {
  const queryClient = useQueryClient()
  const modal = useHookstate(editModalState)
  const {_id, isOpen, src} = modal.get()

  const [desc, setDesc] = useState<string>('')

  const mutation = useMutation({
    mutationFn: API.updateOrCreateDescription,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/'], refetchType: 'all' })
      modal.set({ ...modal.get(), isOpen: false })
    },
  })

  if (!isOpen) return <></>

  return (
    <>
      <Btn
        iconType='close'
        text='Close editor'
        customStyle={{ position: 'absolute', top: '50px', right: '50px', zIndex: 1010 }}
        onClick={() => modal.set({ ...modal.get(), isOpen: false })}
      />
      <Modal
        open
        closeIcon={null}
        className='modal modal--type_edit'
        bodyStyle={{ background: 'transparent' }}
        centered
        footer={null}
      >
        <Space direction='vertical' size={40}>
          <Text variant='h2' color='gray-900' text='Set custom label' />
          <Space direction='vertical' size={20}>
            <div className='picture picture--size_def'>
              <div className='picture__wrap' style={{ borderRadius: '10px' }}>
                <Image src={src} preview={false} className='image' />
              </div>
            </div>
            <Input
              placeholder='My custom label'
              maxLength={100}
              className='text-large custom-input'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDesc(e.target.value)
              }}
            />
            <Text variant='small' color='gray-500' text='100 chars max' />
          </Space>
          <Btn
            text='Save'
            iconType='save'
            onClick={() => {
              mutation.mutate({
                description: desc,
                _id,
              })
            }}
          />
        </Space>
      </Modal>
    </>
  )
}

export default EditModal
