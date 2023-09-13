import React from 'react'
import { Image, Space } from 'antd'
import UploadButton from '../Button'
import Text from '../Text'
import { useHookstate } from '@hookstate/core'
import { uploadModalState } from '../../App'

function Empty() {
  const modal =useHookstate(uploadModalState)

  return (
    <div style={{ display: 'flex', width: '100%', height: '90vh', justifyContent: 'center', alignItems: 'center' }}>
      <Space direction='vertical' align='center' size={60} style={{ display: 'flex', width: '400px', height: '256px' }}>
        <Image src='logo.svg' preview={false} />
        <Space direction='vertical' align='center' size={30}>
          <Space direction='vertical' align='center' size={15}>
            <Text variant='h1' color='gray-900' text='No images uploaded yet' />
            <Text
              variant='default'
              color='gray-500'
              text='Upload your first image by drag and dropping the file on the screen or click the button below'
            />
          </Space>
          <UploadButton text='Upload image' iconType='upload' onClick={() => modal.set(true)} />
        </Space>
      </Space>
    </div>
  )
}

export default Empty
