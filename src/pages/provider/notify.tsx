import { useQuery } from '@tanstack/react-query'
import Tabs from '../../lib/components/ui/Tabs'
import NotifyList from '../../lib/components/user/notify/NotifyList'
import { getUserNotify } from '../../lib/services/api/notifyApi'
import useAuth from '../../lib/hooks/authUser'

const ProviderNotification = () => {
  const { userId} = useAuth()
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['getUserNotify'],
    queryFn: () => getUserNotify(userId),
  })
  const tab = [
    {
      title: <>All</>,
      content: <NotifyList status='all' refetch={refetch} data={data?.data} isLoading={isLoading} isError={isError}/>
    },
    {
      title: <>Unread</>,
      content: <NotifyList status='unread' refetch={refetch} data={data?.data} isLoading={isLoading} isError={isError}/>
    },
  ]
  return (
    <>
        <div  className='bg-white p-6 rounded-lg shadow min-h-[80vh]'>
          <div className='lg:w-9/12 mx-auto text-white rounded-[17px]'>
            <Tabs tabs={tab} type='charts'/>
          </div>
        </div>
    </>
  )
}

export default ProviderNotification