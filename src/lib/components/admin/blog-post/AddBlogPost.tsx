import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../ui/TextInput";
import Button from "../../ui/Button";
import { ScaleSpinner } from "../../ui/Loading";
import ImageInput from "../../ui/ImageInput";
import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadFile } from "../../../services/api/routineApi";
import { toast } from "react-toastify";
import { createBlog, getBlogCategory } from "../../../services/api/blogApi";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from "react-quill"

const AddBlogPost = () => {
  const { data: category } = useQuery({
    queryKey: ["getBlogCat"],
    queryFn: getBlogCategory,
  });
  const [isBusy, setIsBusy] = useState(false);
  const [imageValue, setImageValue] = useState<Array<File>>();
  const [descInput, setDescInput] = useState<string>('')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      categoryId: "",
      title: "",
      body: "",
      coverImage: "",
      published: true,
    },
  });
  const addPost = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      toast.success("Blog post created successfuly");
      setIsBusy(false);
      reset();
      setDescInput('')
      setImageValue([]);
    },
    onError: (error) => {
      toast.error(error.message);
      setIsBusy(false);
    },
  });
  const upload = useMutation({
    mutationFn: uploadFile,
  });
  const onSubmit = (datas: any) => {
    setIsBusy(true);
    if (imageValue) {
      const fd = new FormData();
      fd.append("image", imageValue[0]);
      upload.mutateAsync(fd, {
        onSuccess: (data) => {
          const payload = {
            coverImage: data[0],
            categoryId: datas.categoryId,
            title: datas.title,
            body: descInput,
            published: datas.published,
          };
          addPost.mutate(payload);
        },
        onError: (error) => {
          toast.error(error.message);
          setIsBusy(false);
        },
      });
    } else {
      toast.info("Please add a cover photo");
      setIsBusy(false);
    }
  };
  return (
    <>
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-5 items-end">
            <Controller
              name="title"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter post title",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Blog Title"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.title?.message}
                  type={InputType.text}
                  {...field}
                  ref={null}
                />
              )}
            />
            <Controller
              name="categoryId"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please select a category",
                },
              }}
              render={({ field }) => (
                <div>
                  <p className="text-[#000000B2] fw-500 mb-1">Blog Category</p>
                  <select
                    {...field}
                    className="border border-gray-400 rounded p-[10px] w-full outline-none"
                  >
                    <option value="">Select an option</option>
                    {category &&
                      !!category?.data?.length &&
                      category?.data?.map((item: any, i: number) => (
                        <option value={item.id} key={i}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            />
          </div>
          <div>
          <div className="mt-6 mb-16">
            <p className="text-[#000000B2] fw-500 mb-1">
              Description 
            </p>
            <ReactQuill
              theme="snow"
              value={descInput}
              onChange={setDescInput}
              className="h-28 nunito"
            />
          </div>
          </div>
          <div>
            <ImageInput
              label="Blog Image"
              setImage={setImageValue}
              containerClass="mt-5"
              disabled={false}
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

export default AddBlogPost;
