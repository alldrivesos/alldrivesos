import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CookieModal = () => {
    const [show, setShow] = useState(false)
  let cookie = Cookies.get("rhs_cookie");
  
  const checkCookie = () => {
    Cookies.set("rhs_cookie", "no");
    setShow(false)
  }
  useEffect(() => {
    if(cookie !== "no"){
      setShow(true)
    }
  }, [])
  return (
    <>
      {show  && (
        <div className="bg-white new-shade fixed w-[290px] lg:w-[360px] bottom-6 left-5 lg:left-16 p-6 lg:py-9 rounded-xl z-[40000]">
          <p className="text-lg">Our site uses essential cookies to work.</p>
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-6 mt-7">
            <button onClick={checkCookie} className="border py-2 rounded border-[#949494] text-[#949494]">Close</button>
            <button onClick={checkCookie} className="rounded-[5px] bg-[#123373] py-2 fw-500 text-white">Accept All</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieModal;
