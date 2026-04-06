import AddBlogPost from "../../lib/components/admin/blog-post/AddBlogPost"
import BlogPostList from "../../lib/components/admin/blog-post/BlogPostList"
import Tabs from "../../lib/components/ui/Tabs"

const BlogPage = () => {
    const tabs = [
        {
            title: <p>Blog List</p>,
            content: <BlogPostList/>
        },
        {
            title: <p>Add Blog</p>,
            content: <AddBlogPost/>
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

export default BlogPage