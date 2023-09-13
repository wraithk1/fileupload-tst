import { Divider, Image, Skeleton, Space } from 'antd'
import UploadButton from '../Button'
import React, { useContext } from 'react'
import { DataContext, uploadModalState } from '../../App'
import Text from '../Text'
import { useHookstate } from '@hookstate/core'

function Header() {
  const { isLoading, data } = useContext(DataContext)
  const modal = useHookstate(uploadModalState)

  return (
    <>
      <div className='header'>
        <Space direction='vertical' size={5}>
          <Image src='logo.svg' preview={false} />
          {isLoading ? (
            <Skeleton.Input active size='small' style={{ borderRadius: '10px' }} />
          ) : (
            <Text variant='small' color='gray-500' text={`${(data?.files.length || 0).toString()} images stored in keeper`} />
          )}
        </Space>
        <UploadButton text='Upload image' iconType='upload' disabled={isLoading} onClick={()=> modal.set(true)} />
      </div>
      <Divider type='horizontal' />
    </>
  )
}

export default Header
