import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { ScaleSpinner } from "../../ui/Loading";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ServiceCatItem } from "../../../types/service";
import { editBlogCategory } from "../../../services/api/blogApi";

interface Props {
  close: () => void;
  refetch: () => void;
  item: ServiceCatItem | undefined;
}
const EditCategory: FC<Props> = ({ close, item, refetch }) => {
  const [isBusy, setIsBusy] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: item?.name || "",
    },
  });
  const addCat = useMutation({
    mutationFn: editBlogCategory,
    onSuccess: () => {
      toast.success("Category Edited Successfuly");
      setIsBusy(false);
      close()
      refetch()
    },
    onError: (error) => {
      toast.error(error.message);
      setIsBusy(false);
    },
  });
  const onSubmit = (datas: any) => {
    setIsBusy(true);
      const payload = {
        name: datas.name,
        id: item?.id
      };
      addCat.mutate(payload);
  };
  return (
    <>
      <div className="px-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-h-[350px] overflow-auto pr-2">
          <div className="grid">
            <Controller
              name="name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter category name",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Category Name"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.name?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
          </div>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="w-full">
              <Button
                title={
                  isBusy ? <ScaleSpinner size={14} color="white" /> : "Update"
                }
                disabled={!isValid}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCategory;
