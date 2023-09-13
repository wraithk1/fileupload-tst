import React from 'react'

type Variant = 'small' | 'default' | 'large' | 'h3' | 'h2' | 'h1'
type Color = 'white' |
            'red' |
            'green' |
            'yellow' |
            'orange' |
            'purple-900' |
            'purple-800' |
            'purple-700' |
            'purple-600' |
            'purple-500' |
            'gray-900' |
            'gray-500' |
            'gray-200' |
            'gray-100'


interface Props extends React.PropsWithChildren {
  variant: Variant
  color: Color
  text: string
}

function Text({ variant, color, text, children }: Props) {
  return (
    <span className={`text-${variant}`} style={{ color: `var(--${color}-color)` }}>
      {text ? text : children}
    </span>
  )
}

export default Text
