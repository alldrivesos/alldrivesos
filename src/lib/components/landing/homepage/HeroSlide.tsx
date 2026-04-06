import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/element/css/effect-fade";
import "swiper/css/bundle"
import { register } from "swiper/element/bundle";
import { Autoplay, EffectFade } from "swiper/modules";
import { BsClock } from "react-icons/bs";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
// register Swiper custom elements
register();

const HeroSlide = () => {
  const navigate = useNavigate();
  return (
    <>
      <Swiper
        effect={"fade"}
        autoplay={{ delay: 6000 }}
        modules={[Autoplay, EffectFade]}
        className="h-[570px]"
      >
        <SwiperSlide>
          <div
            className={`bg-[url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1705590870/rsh/Property_1_Group_60_1_k8lvd5.png')] bg-cover lg:bg-fit w-full h-full`}
          >
            <div className="box relative z-10 h-full text-white flex items-center">
              <div className="">
                <div className="flex">
                  <div className="border-2 flex items-center gap-2 text-white px-3 py-2 rounded-[100px] border-[#FEB470]">
                    <BsClock className="text-[#FEB470] text-[14px]" />
                    <p className="fs-200 md:fs-300 lg:fs-400 fw-500 text-[#FEB470]">
                      Available 24/7 for emergency road service
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-[658px] mt-10 lg:mt-3">
                  <p className="text-2xl md:text-3xl lg:text-[45px] fw-600 leading-[40px] lg:leading-normal">
                    Your Safety, Our Priority - Trust Us to Get You Back on the
                    Road.
                  </p>
                  <p className="fw-600 mt-4">Vehicle breakdown? Get ALLDRIVE SOS, the #1 roadside assistance app to connect with nearby providers instantly. 24/7 nationwide coverage. Get rescued now!</p>
                </div>
                <div className="lg:flex gap-x-6 itms-center mt-10">
                  <Button
                  onClick={() => navigate("/request")}
                    title={"Get Help"}
                    altClassName="btn-feel fs-500 bg-[#FEB470] border-2 border-[#FEB470] text-black px-6 py-2"
                  />
                  <Button
                    title={"Sign up as a Service Provider"}
                    altClassName="fw-500 text-white mt-3 lg:mt-0 border-2 border-white rounded-[100px] px-4 py-2"
                    onClick={() => navigate("/auth/register")}
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`bg-[url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1705590870/rsh/Property_1_Group_61_1_j5kusu.png')] bg-cover lg:bg-fit w-full h-full`}
          >
            <div className="box relative z-10 h-full text-white flex items-center">
              <div className="">
                <div className="flex">
                  <div className="border-2 flex items-center gap-2 text-white px-3 py-2 rounded-[100px] border-[#FEB470]">
                    <BsClock className="text-[#FEB470] text-[14px]" />
                    <p className="fs-200 md:fs-300 lg:fs-400 fw-500 text-[#FEB470]">
                      Available 24/7 for emergency road service
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-[658px] mt-10 lg:mt-3">
                  <p className="text-2xl md:text-3xl lg:text-[45px] fw-600 leading-[40px] lg:leading-normal">
                    Quick Fix for On-the-Go Emergencies. Fast and Reliable.
                  </p>
                  <p className="fw-600 mt-4">Vehicle breakdown? Get ALLDRIVE SOS, the #1 roadside assistance app to connect with nearby providers instantly. 24/7 nationwide coverage. Get rescued now!</p>
                </div>
                <div className="lg:flex gap-x-6 itms-center mt-10">
                  <Button
                    onClick={() => navigate("/request")}
                    title={"Get Help"}
                    altClassName="btn-feel fs-500 bg-[#FEB470] border-2 border-[#FEB470] text-black px-6 py-2"
                  />
                  <Button
                    title={"Sign up as a Service Provider"}
                    altClassName="fw-500 text-white mt-3 lg:mt-0 border-2 border-white rounded-[100px] px-4 py-2"
                    onClick={() => navigate("/auth/register")}
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`bg-[url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1705590870/rsh/Property_1_Group_62_1_abdsgx.png')] bg-cover lg:bg-fit w-full h-full`}
          >
            <div className="box relative z-10 h-full text-white flex items-center">
              <div className="">
                <div className="flex">
                  <div className="border-2 flex items-center gap-2 text-white px-3 py-2 rounded-[100px] border-[#FEB470]">
                    <BsClock className="text-[#FEB470] text-[14px]" />
                    <p className="fs-200 md:fs-300 lg:fs-400 fw-500 text-[#FEB470]">
                      Available 24/7 for emergency road service
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-[658px] mt-10 lg:mt-3">
                  <p className="text-2xl md:text-3xl lg:text-[45px] fw-600 leading-[40px] lg:leading-normal">
                    Never Run out of Fuel Again as We've got You Covered.
                  </p>
                  <p className="fw-600 mt-4">Vehicle breakdown? Get ALLDRIVE SOS, the #1 roadside assistance app to connect with nearby providers instantly. 24/7 nationwide coverage. Get rescued now!</p>
                </div>
                <div className="lg:flex gap-x-6 itms-center mt-10">
                  <Button
                    onClick={() => navigate("/request")}
                    title={"Get Help"}
                    altClassName="btn-feel fs-500 bg-[#FEB470] border-2 border-[#FEB470] text-black px-6 py-2"
                  />
                  <Button
                    title={"Sign up as a Service Provider"}
                    altClassName="fw-500 text-white mt-3 lg:mt-0 border-2 border-white rounded-[100px] px-4 py-2"
                    onClick={() => navigate("/auth/register")}
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`bg-[url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1705590870/rsh/Property_1_Group_63_1_ne1lwh.png')] bg-cover lg:bg-fit w-full h-full`}
          >
            <div className="box relative z-10 h-full flex text-white items-center">
              <div className="">
                <div className="flex">
                  <div className="border-2 flex items-center gap-2  px-3 py-2 rounded-[100px] border-[#FEB470]">
                    <BsClock className="text-[#FEB470] text-[14px]" />
                    <p className="fs-200 md:fs-300 lg:fs-400 fw-500 text-[#FEB470]">
                      Available 24/7 for emergency road service
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-[658px] mt-10 lg:mt-3">
                  <p className="text-2xl md:text-3xl lg:text-[45px] fw-600 leading-[40px] lg:leading-normal">
                    Locked Out? We're Here 24/7 to Get You Back Behind the
                    Wheel!
                  </p>
                  <p className="fw-600 mt-4">Vehicle breakdown? Get ALLDRIVE SOS, the #1 roadside assistance app to connect with nearby providers instantly. 24/7 nationwide coverage. Get rescued now!</p>
                </div>
                <div className="lg:flex gap-x-6 itms-center mt-10">
                  <Button
                    onClick={() => navigate("/request")}
                    title={"Get Help"}
                    altClassName="btn-feel fs-500 bg-[#FEB470] border-2 border-[#FEB470] text-black px-6 py-2"
                  />
                  <Button
                    title={"Sign up as a Service Provider"}
                    altClassName="fw-500 text-white mt-3 lg:mt-0 border-2 border-white rounded-[100px] px-4 py-2"
                    onClick={() => navigate("/auth/register")}
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={`bg-[url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1705590870/rsh/Property_1_Group_64_2_njx6mz.png')] bg-cover lg:bg-fit w-full h-full`}
          >
            <div className="box relative z-10 h-full flex text-white items-center">
              <div className="">
                <div className="flex">
                  <div className="border-2 flex items-center gap-2 text-white px-3 py-2 rounded-[100px] border-[#FEB470]">
                    <BsClock className="text-[#FEB470] text-[14px]" />
                    <p className="fs-200 md:fs-300 lg:fs-400 fw-500 text-[#FEB470]">
                      Available 24/7 for emergency road service
                    </p>
                  </div>
                </div>
                <div className="w-full lg:w-[658px] mt-10 lg:mt-3">
                  <p className="text-2xl md:text-3xl lg:text-[45px] fw-600 leading-[40px] lg:leading-normal">
                    On-the-Spot Battery Replacement. Ready to Power Your
                    Journey.
                  </p>
                  <p className="fw-600 mt-4">Vehicle breakdown? Get ALLDRIVE SOS, the #1 roadside assistance app to connect with nearby providers instantly. 24/7 nationwide coverage. Get rescued now!</p>
                </div>
                <div className="lg:flex gap-x-6 itms-center mt-10">
                  <Button
                    title={"Get Help"}
                    onClick={() => navigate("/request")}
                    altClassName="btn-feel fs-500 bg-[#FEB470] border-2 border-[#FEB470] text-black px-6 py-2"
                  />
                  <Button
                    title={"Sign up as a Service Provider"}
                    altClassName="fw-500 text-white mt-3 lg:mt-0 border-2 border-white rounded-[100px] px-4 py-2"
                    onClick={() => navigate("/auth/register")}
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HeroSlide;
