import React from 'react'

const UsernameSpan = props => {
  let html = {
    __html: props.username === 'unimemo' ? makeUp10('UniMemo') : makeUp10(props.username)
  }

  return (
    <span dangerouslySetInnerHTML={html}></span>
  )
}

export default UsernameSpan

function makeUp10(string){
  let arr = string.split('')
  while(arr.length < 10){
    if(arr.length % 2 === 1){
      arr.unshift('&nbsp;')
    }else{
      arr.push('&nbsp;')
    }
  }
  return arr.join('')
}
