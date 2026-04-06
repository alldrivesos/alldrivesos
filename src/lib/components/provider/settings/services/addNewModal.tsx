import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  addCompanyCategories,
  getCategories,
} from "../../../../services/api/serviceApi";
import { ServiceCatItem } from "../../../../types/service";
import Button from "../../../ui/Button";
import CurveLoader from "../../../ui/loader/curveLoader/CurveLoader";
import { toast } from "react-toastify";

interface Props {
  refetch: () => void;
  close: () => void;
  prevValue: string[];
}
const AddNewSeviceModal: FC<Props> = ({ close, refetch, prevValue }) => {
  const { data: service, isLoading } = useQuery({
    queryKey: ["getCat"],
    queryFn: getCategories,
  });
  const [serviceList, setServiceList] = useState([]);
  const [selected, setSelected] = useState<string[]>([]);
  useEffect(() => {
    const prev = prevValue.map((item: any) => item.id);
    if (service) {
      const filtered = service?.data?.filter(
        (item: any) => !prev.includes(item.id)
      );
      setServiceList(filtered);
    }
  }, [service]);
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (e.target.checked) {
      if (!selected.includes(val)) {
        setSelected([...selected, val]);
      }
    } else {
      const filtered = selected.filter((item) => item !== val);
      setSelected(filtered);
    }
  };
  const handleSubmit = async () => {
    const payload = {
      services: selected
    }
    await addCompanyCategories(payload)
      .then(() => {
        toast.success("Selected service(s) has been added");
        refetch();
        close();
      })
      .catch(() => {});
    refetch();
    close();
  };
  return (
    <div>
      {isLoading && (
        <div className="py-12 flex justify-center items-center text-black">
          <div>
            <div className="flex place-center">
              <CurveLoader />
            </div>
            <p className="text-center mt-5 fw-500">Fetching Services...</p>
          </div>
        </div>
      )}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-4 mb-6">
        {service &&
          serviceList.length &&
          serviceList.map((item: ServiceCatItem) => (
            <div className="bg-white relative flex gap-x-2 items-center p-2 shadow" key={item.id}>
              <div className="w-12">
                <input
                  type="checkbox"
                  className="w-6 h-6"
                  value={item.id}
                  onChange={(e) => handleCheck(e)}
                />
              </div>
              <div>
                <p className="fw-500">{item.name}</p>
              </div>
            </div>
          ))}
      </div>
      <div>
        <Button title={"Continue"} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AddNewSeviceModal;
