import { Button } from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FC, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { formatAsNgnMoney, getJustNumbers } from "../../../../utils";
import RenderTimer from "./Extra/RenderTime";
import { toast } from "react-toastify";
import useRequestStore from "../../../../store/serviceStore";
import {
  getServiceQoutes,
  selectThisQoute,
} from "../../../../services/api/serviceApi";
import CurveLoader from "../../../ui/loader/curveLoader/CurveLoader";
import { ServiceQouteItem } from "../../../../types/service";
import ProfileAvatar from "../../../ui/ProfileAvatar";
import { MdRefresh } from "react-icons/md";
import { useLocation } from "./ServiceSec";
import NewProviderList from "../new-request/forms/new-provider-list";

interface Props {
  next: () => void;
  prev: () => void;
}

const ProviderList: FC<Props> = ({ next }) => {
  return <NewProviderList next={next} />;
  const request = useRequestStore((state) => state.request);
  const saveRequest = useRequestStore((state) => state.saveRequest);
  const [location] = useLocation();

  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const star = Array(5).fill("");
  const [checked, setChecked] = useState<string | number>();
  const [play, setPlay] = useState(false);
  const [forward, setForward] = useState(false);
  const [amount, setAmount] = useState(0);
  const fetchProviders = async () => {
    setPlay(false);
    setLoading(true);
    await getServiceQoutes(request.id)
      .then((res) => {
        setProviders(res?.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };
  const selectProvider = async (id: string, amount: number) => {
    setChecked(id);
    setAmount(amount);
    setForward(true);
  };
  useEffect(() => {
    setPlay(true);
  }, []);
  const handleNext = async () => {
    if (forward) {
      await selectThisQoute(String(checked))
        .then(() => {
          saveRequest({
            ...request,
            price: amount,
            qouteId: String(checked),
            level: 2,
          });
          next();
        })
        .catch((err: any) => {
          toast.error(err.response.data.message);
        });
    } else {
      toast.info("Please select a service provider");
    }
  };
  const formatTimeTaken = (time: any) => {
    const parse = JSON.parse(time);
    const vals = Object.values(parse) as unknown as string;
    return `${vals[0]} - ${vals[1]}`;
  };
  return (
    <>
      <div className="bg-gray-100 lg:p-10 lg:pb-20 p-4 pb-8 rounded-md">
        <div className="grid gap-4">
          {play && <RenderTimer action={fetchProviders} play={play} />}
          {!play &&
            !loading &&
            !!providers.length &&
            providers.map((item: ServiceQouteItem) => (
              <div
                key={item.id}
                className="bg-white flex justify-between shadow p-4 lg:px-8 rounded-xl"
              >
                <div className="flex gap-x-12">
                  <input
                    type="checkbox"
                    checked={checked === item.id}
                    onChange={() => selectProvider(item.id, item?.quote)}
                    name="provider"
                    className="w-6 h-6 mt-1"
                  />
                  <div className="flex gap-x-4">
                    <ProfileAvatar
                      url={item?.driver?.photo}
                      name={`${item?.driver?.fname} ${item?.driver?.lname}`}
                      size={70}
                      font={22}
                      square={true}
                    />
                    <div>
                      <p>{`${item?.driver?.fname} ${item?.driver?.lname}`}</p>
                      <p>
                        Distance:{" "}
                        <span className="fw-600">{`${getJustNumbers(
                          item.distance,
                        )}`}</span>
                      </p>
                      <p>{formatTimeTaken(item.timeTaken)}</p>
                      <div className="flex mt-2 gap-x-2">
                        {star.map((items, i) => (
                          <p key={i} className="text-gray-500">
                            <FaStar
                              className={`${items} text-xl ${
                                i + 1 <= (item?.driver?.reviewsAvg || 0) &&
                                "text-orange-400"
                              }`}
                            />
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xl fw-600">{formatAsNgnMoney(item.quote)}</p>
              </div>
            ))}
          {!play && !loading && (
            <div className="flex justify-end mt-12">
              <button
                className="underline px-4 py-2 flex items-center gap-x-1"
                onClick={() => fetchProviders()}
              >
                <MdRefresh /> Search Again
              </button>
            </div>
          )}
          {loading && (
            <div className="py-12 flex justify-center items-center text-black">
              <div>
                <div className="place-center">
                  <CurveLoader />
                </div>
                <p className="text-center mt-5 fw-500">Providers Requests...</p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-16 flex justify-end">
          <Button
            onClick={handleNext}
            type={"submit"}
            className="btn-feel flex gap-x-2 items-center"
          >
            Next <FaArrowRightLong />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProviderList;
