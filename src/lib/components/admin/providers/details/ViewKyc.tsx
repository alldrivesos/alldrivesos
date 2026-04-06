import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import {
  approveCompanyKyc,
  getCompanyKyc,
} from "../../../../services/api/kycApi";
import CurveLoader from "../../../ui/loader/curveLoader/CurveLoader";
import dayjs from "dayjs";
import Button from "../../../ui/Button";
import useModal from "../../../../hooks/useModal";
import ReusableModal from "../../../ui/ReusableModal";
import { toast } from "react-toastify";
import DisapproveKyc from "./DisapproveKyc";
import { formatPhoneNumber } from "../../../../utils";

interface Props {
  id: string;
  kyc: any;
  refetch: () => void;
}
const ViewKyc: FC<Props> = ({ id, refetch }) => {
  const {
    data,
    isLoading,
    refetch: refetchKyc,
  } = useQuery({
    queryKey: ["getCompanyKyc"],
    queryFn: () => getCompanyKyc(id),
  });
  const { Modal, setShowModal } = useModal();
  const { Modal: DisApproval, setShowModal: SetDisApproval } = useModal();
  const approveKyc = async () => {
    const datas = {
      id: data?.data?.id,
      userId: data?.data?.userId,
    };
    const payload = {
      approved: true,
      reason: "",
    };
    await approveCompanyKyc(datas, payload)
      .then((res) => {
        toast.success(res.message);
        setShowModal(false);
        refetch();
        refetchKyc();
      })
      .catch((err: any) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <div className="bg-white p-6 shadow rounded min-h-[350px]">
        {isLoading && (
          <div className="py-12 flex justify-center items-center text-black">
            <div>
              <div className="flex justify-center">
                <CurveLoader />
              </div>
              <p className="text-center mt-5 fw-500">Fetching Company KYC...</p>
            </div>
          </div>
        )}
        {!isLoading && data && (
          <div>
            <div className="flex flex-col lg:flex-row gap-3 mb-8 lg:mb-0 justify-end">
              {/* {data?.data?.isVerified && (
                <div className="text-red-600 text-lg fw-600 flex items-center gap-x-2">
                  <span className="w-3 h-3 circle bg-red-600 block"></span>{" "}
                  Declined
                </div>
              )} */}
              {data?.data?.isVerified ? (
                <div className="text-green-600 text-lg fw-600 flex items-center gap-x-2">
                  <span className="w-3 h-3 circle bg-green-600 block"></span>{" "}
                  Verified
                </div>
              ) : (
                <Button
                  title={"Approve KYC"}
                  disabled={data?.data ? false : true}
                  altClassName="px-5 py-2 rounded-lg bg-primary text-white"
                  onClick={() => setShowModal(true)}
                />
              )}
              {!data?.data?.isVerified && (
                <Button
                  title={"Disapprove KYC"}
                  disabled={data?.data ? false : true}
                  altClassName="px-5 py-2 rounded-lg bg-primary text-white"
                  onClick={() => SetDisApproval(true)}
                />
              )}
            </div>
            <div>
              <p className="fw-600 mb-2 flex items-center gap-x-2">
                <span className="block w-4 h-4 bg-primary circle"></span>
                Organization Information
              </p>
              <div className="bg-gray-50 p-5 grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="fw-500 text-gray-500">
                    Business Registration No:
                  </p>
                  <p className="fw-600 mt-2">
                    {data?.data?.registration_number}
                  </p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">
                    Date of Incorporation/Registration
                  </p>
                  <p className="fw-600 mt-2">
                    {dayjs(data?.data?.incorporation_date).format("MMMM YYYY")}
                  </p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Operational Address</p>
                  <p className="fw-600 mt-2">{data?.data?.address}</p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Business Description:</p>
                  <p className="fw-600 mt-2">{data?.data?.business_desc}</p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Device IP Address:</p>
                  <p className="fw-600 mt-2">{data?.data?.device_ip}</p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Nature of Company</p>
                  <p className="fw-600 mt-2">{data?.data?.business_nature}</p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">
                    Tax Identification Number
                  </p>
                  <p className="fw-600 mt-2">{data?.data?.tax_id}</p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">
                    Company Contact Information
                  </p>
                  <p className="fw-600 mt-2">{data?.data?.business_email}</p>
                  <p className="fw-600 mt-1">
                    {formatPhoneNumber(data?.data?.business_phone)}
                  </p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">
                    Business Registration Certificate
                  </p>
                  <div className="mt-2">
                    {data?.data?.business_reg_certificate && (
                      <a
                        href={data?.data?.business_reg_certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={data?.data?.business_reg_certificate}
                          alt="doc"
                          className="w-32 border-2 cursor-pointer rounded h-16"
                        />
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Insurance Documents</p>
                  <div className="mt-2 flex gap-x-3">
                    {!!data?.data?.insurance_doc?.length &&
                      data?.data?.insurance_doc.map(
                        (item: string, i: number) => (
                          <a
                            href={item}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={i}
                          >
                            <img
                              src={item}
                              alt="doc"
                              className="w-32 border-2 cursor-pointer rounded h-16"
                            />
                          </a>
                        ),
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="fw-600 mb-2 flex items-center gap-x-2">
                <span className="block w-4 h-4 bg-primary circle"></span>
                Director's Information
              </p>
              <div className="bg-gray-50 p-5 grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="fw-500 text-gray-500">Full Name:</p>
                  <p className="fw-600 mt-2">{data?.data?.director_fullname}</p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Designation:</p>
                  <p className="fw-600 mt-2">
                    {data?.data?.director_designation}
                  </p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Email:</p>
                  <p className="fw-600 mt-2">{data?.data?.director_email}</p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Contact Phone:</p>
                  <p className="fw-600 mt-2">
                    {formatPhoneNumber(data?.data?.director_phone)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="fw-600 mb-2 flex items-center gap-x-2">
                <span className="block w-4 h-4 bg-primary circle"></span>Bank
                Information
              </p>
              <div className="bg-gray-50 p-5 grid gap-4 lg:grid-cols-2">
                <div>
                  <p className="fw-500 text-gray-500">Bank Name:</p>
                  <p className="fw-600 mt-2">{data?.data?.bank_name}</p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Routing Number:</p>
                  <p className="fw-600 mt-2">{data?.data?.routing_number}</p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Account Name:</p>
                  <p className="fw-600 mt-2">{data?.data?.bank_account_name}</p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Account Number:</p>
                  <p className="fw-600 mt-2">
                    {data?.data?.bank_account_number}
                  </p>
                </div>
                <div>
                  <p className="fw-500 text-gray-500">Account Type:</p>
                  <p className="fw-600 mt-2">{data?.data?.account_type}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal title="" size="sm">
        <ReusableModal
          title="Are you sure you want to approve this request"
          action={() => approveKyc()}
          actionTitle="Approve"
          cancelTitle="Close"
          closeModal={() => setShowModal(false)}
          isBusy={false}
        />
      </Modal>
      <DisApproval title="Disapprove Company Kyc" size="sm">
        <DisapproveKyc
          id={data?.data?.id}
          userId={data?.data?.userId}
          close={() => SetDisApproval(false)}
          refetch={refetchKyc}
        />
      </DisApproval>
    </>
  );
};

export default ViewKyc;
