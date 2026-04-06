import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { ScaleSpinner } from "../../ui/Loading";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createBlogCategory } from "../../../services/api/blogApi";

const AddCategory = () => {
  const [isBusy, setIsBusy] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });
  const addCat = useMutation({
    mutationFn: createBlogCategory,
    onSuccess: () => {
      toast.success('Category Created Successfuly');
      setIsBusy(false)
      reset()
    },
    onError: (error) => {
      toast.error(error.message);
      setIsBusy(false);
    },
  });

  const onSubmit = (datas: any) => {
    setIsBusy(true);
    addCat.mutate(datas)
  };
  return (
    <>
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="mt-12 flex justify-center">
            <div className="lg:w-5/12 w-full">
              <Button
                title={
                  isBusy ? <ScaleSpinner size={14} color="white" /> : "Continue"
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

export default AddCategory;
