import { FC } from "react"

interface Props {
    msg: string
}
const EmptyState:FC<Props> = ({msg}) => {
  return (
    <div className="py-12 place-center">
        <div>
            <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1708518762/rsh/empty_enc96m.jpg" alt="empty" className="w-[240px] mx-auto" />
            <p className="text-center mt-6 mx-auto">{msg}</p>
        </div>
    </div>
  )
}

export default EmptyState