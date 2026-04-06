import { FC } from "react"

interface Props {
    msg: string
}
const SmallEmptyState:FC<Props> = ({msg}) => {
  return (
    <div className="py-6 place-center">
        <div>
            <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1709738926/rsh/empty-removebg-preview_jpcuu2.png" alt="empty" className="w-[140px] mx-auto" />
            <p className="text-center mt-6 mx-auto">{msg}</p>
        </div>
    </div>
  )
}

export default SmallEmptyState