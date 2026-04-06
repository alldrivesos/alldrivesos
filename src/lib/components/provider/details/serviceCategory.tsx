import { FC } from "react";
import { ServiceCatItem } from "../../../types/service";
import { formatAsNgnMoney } from "../../../utils";

interface CatType extends ServiceCatItem {
  fee: number;
}
interface Props {
  cat: CatType[];
}
const ServiceCategory: FC<Props> = ({ cat }) => {
  return (
    <>
      {!!cat?.length &&
        cat.map((item) => (
          <div className="flex gap-x-3 mb-3" key={item.id}>
            <div className="relative -bottom-2">
              <div className="absolute w-4 h-4 circle bg-review -top-1 -left-1"></div>
              <div className="relative w-4 h-4 circle bg-review  border border-white"></div>
            </div>
            <div>
              <p className="fw-500 mb-1">{item.name}</p>
              {/*<p>{formatAsNgnMoney(item.fee)}</p>*/}
            </div>
          </div>
        ))}
    </>
  );
};

export default ServiceCategory;
