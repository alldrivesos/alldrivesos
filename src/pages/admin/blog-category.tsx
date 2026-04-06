import AddCategory from "../../lib/components/admin/blog-category/AddCategory"
import CategoryList from "../../lib/components/admin/blog-category/CategoryList"
import Tabs from "../../lib/components/ui/Tabs"

const BlogCategory = () => {
    const tabs = [
        {
            title: <p>Blog Categories</p>,
            content: <CategoryList/>
        },
        {
            title: <p>Add Blog Category</p>,
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

export default BlogCategory