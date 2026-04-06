import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../ui/TextInput";
import { ScaleSpinner } from "../../ui/Loading";
import Button from "../../ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { adminAddRates, adminGetRates } from "../../../services/api/adminApi";
import { toast } from "react-toastify";

const AdminRates = () => {
  const [isBusy, setIsBusy] = useState(false);
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["getAdminRates"],
    queryFn: adminGetRates,
  });
  useEffect(() => {
    if (data) {
      reset({
        service_percent: data?.data?.service_percent,
        tax_percent: data?.data?.tax_percent,
        company_percent: data?.data?.company_percent,
        driver_refund_charge: data?.data?.driver_refund_charge,
      });
    }
  }, [data]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      tax_percent: "",
      service_percent: "",
      company_percent: "",
      driver_refund_charge: "",
    },
  });
  const mutate = useMutation({
    mutationFn: adminAddRates,
    mutationKey: ["admin-add-rates"],
  });
  const onSubmit = (data: any) => {
    if (
      data?.service_percent > 100 ||
      data?.tax_percent > 100 ||
      data?.company_percent > 100 ||
      data?.driver_refund_charge > 100
    ) {
      toast.info("Invalid Percentage");
      return;
    }
    setIsBusy(true);
    const payload = {
      tax_percent: Number(data.tax_percent),
      service_percent: Number(data.service_percent),
      company_percent: Number(data.company_percent),
      driver_refund_charge: Number(data.driver_refund_charge),
    };
    mutate.mutate(payload, {
      onSuccess: (data) => {
        setIsBusy(false);
        toast.success(data.message);
        refetch();
      },
      onError: () => {
        toast.error("Something went wrong");
        setIsBusy(false);
      },
    });
  };
  return (
    <>
      <div className="bg-gray-100 rounded p-4 lg:p-5">
        <p className="text-lg fw-600">Rates Setting</p>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="service_percent"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your service rate",
                  },
                  maxLength: 3,
                  value: "number",
                }}
                disabled={isLoading}
                render={({ field }) => (
                  <TextInput
                    label="Customer Service Charge (%)"
                    labelClassName="text-gray-500 fw-500"
                    error={errors.service_percent?.message}
                    type={InputType.number}
                    min={0}
                    max={100}
                    maxLength={3}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mt-4">
              <Controller
                name="company_percent"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your service rate",
                  },
                  maxLength: 3,
                  value: "number",
                }}
                disabled={isLoading}
                render={({ field }) => (
                  <TextInput
                    label="Provider's Charge (%)"
                    labelClassName="text-gray-500 fw-500"
                    error={errors.company_percent?.message}
                    type={InputType.number}
                    min={0}
                    max={100}
                    maxLength={3}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mt-4">
              <Controller
                name="tax_percent"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your service rate",
                  },
                  maxLength: 3,
                  value: "number",
                }}
                disabled={isLoading}
                render={({ field }) => (
                  <TextInput
                    label="VAT (%)"
                    labelClassName="text-gray-500 fw-500"
                    error={errors.tax_percent?.message}
                    type={InputType.number}
                    min={0}
                    max={100}
                    maxLength={3}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mt-4">
              <Controller
                name="driver_refund_charge"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your service rate",
                  },
                  maxLength: 3,
                  value: "number",
                }}
                disabled={isLoading}
                render={({ field }) => (
                  <TextInput
                    label="Driver Refund (%)"
                    labelClassName="text-gray-500 fw-500"
                    error={errors.tax_percent?.message}
                    type={InputType.number}
                    min={0}
                    max={100}
                    maxLength={3}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mt-8 flex justify-end">
              <div className="lg:w-5/12">
                <Button
                  title={
                    isBusy ? <ScaleSpinner size={10} color="white" /> : "Update"
                  }
                  altClassName="btn-primary py-2 w-full text-lg fw-500"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminRates;
