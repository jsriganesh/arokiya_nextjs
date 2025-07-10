"use client";

import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

type FormData = {
  memberName: string;
  mobile: string;
  email: string;
  address: string;
  bloodGroup: string;
  dob: Date | null;
  isDonor: string;
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      dob: null,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted", data);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">User Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Grid layout for fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Member Name */}
          <div>
            <label className="mb-1 block font-medium">Member Name *</label>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-2"
              {...register("memberName", {
                required: "Member name is required",
                maxLength: { value: 30, message: "Max length is 30" },
              })}
            />
            {errors.memberName && <p className="text-sm text-red-500">{errors.memberName.message}</p>}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="mb-1 block font-medium">Mobile Number *</label>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-2"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Mobile number must be exactly 10 digits",
                },
              })}
            />
            {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block font-medium">Email *</label>
            <input
              type="email"
              className="w-full rounded border border-gray-300 p-2"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="mb-1 block font-medium">Address *</label>
            <input
              type="text"
              className="w-full rounded border border-gray-300 p-2"
              {...register("address", {
                required: "Address is required",
                maxLength: { value: 150, message: "Max length is 150" },
              })}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
          </div>

          {/* Blood Group */}
          <div>
            <label className="mb-1 block font-medium">Blood Group *</label>
            <select
              className="w-full rounded border border-gray-300 p-2"
              {...register("bloodGroup", { required: "Blood group is required" })}
            >
              <option value="">Select</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            {errors.bloodGroup && <p className="text-sm text-red-500">{errors.bloodGroup.message}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="mb-1 block font-medium">Date of Birth *</label>
            <Controller
              control={control}
              name="dob"
              rules={{ required: "Date of birth is required" }}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="dd/MM/yyyy"
                  className="w-full rounded border border-gray-300 p-2"
                />
              )}
            />
            {errors.dob && <p className="text-sm text-red-500">{errors.dob.message}</p>}
          </div>

          {/* Yes or No */}
          <div>
            <label className="mb-1 block font-medium">Are you a donor? *</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input type="radio" value="yes" {...register("isDonor", { required: "Please select an option" })} />
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" value="no" {...register("isDonor", { required: "Please select an option" })} />
                No
              </label>
            </div>
            {errors.isDonor && <p className="text-sm text-red-500">{errors.isDonor.message}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
