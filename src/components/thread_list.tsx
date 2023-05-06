import React from 'react'
import { View } from '@tarojs/components'
import { Thread } from './thread'
import { Loading } from './loading'

interface ThreadListProps {
  threads: Array<{
    id: string,
    node: {
      title:string
    }
    title: string,
    last_modified: number,
    replies: number,
    member: {
      username: string,
      avatar_normal: string,
      avatar_large: string
    }
  }>,
  loading: boolean
}

const ThreadList: React.FC<ThreadListProps> = ({ threads, loading }) => {
  if (loading) {
    return <Loading />
  }

  const element = threads.map((thread) => {
    return (
      <Thread
        key={thread.id}
        node={thread.node}
        title={thread.title}
        last_modified={thread.last_modified}
        replies={thread.replies}
        tid={thread.id}
        member={thread.member}
      />
    )
  })

  return <View className='thread-list'>{element}</View>
}

ThreadList.defaultProps = {
  threads: [],
  loading: true,
}

export { ThreadList }
