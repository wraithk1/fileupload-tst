import React from 'react'
import { Button } from 'antd'
import { CheckOutlined, CloseOutlined, CloudUploadOutlined } from '@ant-design/icons'
import _ from 'lodash'
import type { BaseButtonProps } from 'antd/es/button/button'

interface Props extends Omit<BaseButtonProps, 'style' | 'className' | 'icon'> {
  text: string
  iconType: 'upload' | 'close' | 'save'
  customClassName?: string
  customStyle?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLElement>
}

function CustomButton({ text, iconType, customClassName, customStyle, ...rest }: Props) {
  return (
    <Button
      icon={(() => {
        switch (iconType) {
          case 'upload':
            return <CloudUploadOutlined />
          case 'close':
            return <CloseOutlined />
          case 'save':
            return <CheckOutlined />
          default:
            return <></>
        }
      })()}
      className={'text-default ' + customClassName}
      style={_.assign({ 
          padding: '15px 20px 15px 15px', 
          background: 'var(--gray-200-color)', 
          color: 'var(--purple-800-color)' 
        },
        customStyle,
      )}
      {...rest}
    >
      {text}
    </Button>
  )
}

export default CustomButton
