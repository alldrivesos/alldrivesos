import { useQuery } from '@tanstack/react-query'
import NotifyList from '../../lib/components/admin/notify/NotifyList'
import Tabs from '../../lib/components/ui/Tabs'
import { getAdminNotify } from '../../lib/services/api/notifyApi'

const AdminNotification = () => {
    const { isLoading, isError, data, refetch } = useQuery({
        queryKey: ['getAdminNotify'],
        queryFn: getAdminNotify,
      })
  const tab = [
    {
      title: <>All</>,
      content: <NotifyList status='all' refetch={refetch} data={data?.data} isLoading={isLoading} isError={isError}/>
    },
    {
      title: <>Unread</>,
      content: <NotifyList status='unread'  refetch={refetch} data={data?.data} isLoading={isLoading} isError={isError}/>
    },
  ]
  return (
    <>
        <div  className='bg-white p-6 rounded-lg shadow min-h-[80vh]'>
          <div className='lg:w-10/12 mx-auto text-white rounded-[17px]'>
            <Tabs tabs={tab} type='charts'/>
          </div>
        </div>
    </>
  )
}

export default AdminNotification