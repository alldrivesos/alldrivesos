import { FC } from "react";

interface Props {
  brands: string[];
}
const ServiceBrands: FC<Props> = ({ brands }) => {
  return (
    <>
      {!!brands?.length &&
        brands?.map((item) => (
          <div className="flex gap-x-3 items-center mb-3" key={item}>
            <div className="relative">
              <div className="absolute w-4 h-4 circle bg-review -top-1 -left-1"></div>
              <div className="relative w-4 h-4 circle bg-review  border border-white"></div>
            </div>
            <p className="">{item}</p>
          </div>
        ))}
    </>
  );
};

export default ServiceBrands;
