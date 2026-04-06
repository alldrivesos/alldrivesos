import  {FC} from "react";
import { Link } from "react-router-dom";
import { FOOTER_LIST } from "./Routes";

interface Props {
    show: () => void
}
const CallOutMenu:FC<Props> = ({show}) => {
  return (
    <>
      <div className="fixed menu-top top-0 h-screen z-[1000] bg-modal w-full"
      onClick={show}>
        <div className="bg-primary relative menu-pop h-full text-white pl-5 pt-8 w-[75%]">
          <div className="mb-16">
            <img
              src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1706192917/rsh/Group_48097864_1_mopmlj.png'
              alt="logo"
              width={100}
              height={80}
              className="w-48"
            />
          </div>
          <div>
            <ul className=" grid gap-6">
              {FOOTER_LIST.map((item, i) => (
                <li key={i}>
                  <Link to={item.url} className="">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-16">
              <Link to="/auth/login" className="px-8 py-3 rounded-md bg-white text-primary fw-600">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallOutMenu;