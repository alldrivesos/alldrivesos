import Tabs from '../../lib/components/ui/Tabs'
import CategoryList from '../../lib/components/admin/category/CategoryList'
import AddCategory from '../../lib/components/admin/category/AddCategory'

const AdminCategory = () => {
    const tabs = [
        {
            title: <p>Service List</p>,
            content: <CategoryList/>
        },
        {
            title: <p>Add Service</p>,
            content: <AddCategory/>
        },
    ]
  return (
    <>
        <div className='bg-white p-6 rounded-lg shadow min-h-[80vh]'>
            <Tabs tabs={tabs} type='charts'/>
        </div>
    </>
  )
}

export default AdminCategory