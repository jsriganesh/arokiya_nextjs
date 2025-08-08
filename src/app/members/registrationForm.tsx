"use client";

import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useState } from "react";
import { IconButton, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Grid, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import WebcamCapture from "@/components/webcamCapture";
import AutoCompleteDropDown from "@/components/autoCompleteDropDown";
import Image from "next/image";

type FormData = {
  memberName: string;
  mobile: string;
  email: string;
  address: string;
  bloodGroup: string;
  dob: Date | null;
  doj: Date | null;
  isDonor: string;
  gender: string;
  plan: string;
  // paidAmount: string;
  // advanceAmount: string;
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const gender = ["Male", "Female", "Others"];

const modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface PaymentDetailsProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  plan: any;
  // collectAdvance:string,
  advanceAmount: string
  paidAmount: string
}

const defaultPaymentDetails: PaymentDetailsProps = {
  plan: {},
  // collectAdvance:'',
  advanceAmount: '',
  paidAmount: ''
}


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

  const [profileImage, setProfileImage] = useState('');
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsProps>(defaultPaymentDetails);



  const onSubmit = (data: FormData) => {
    console.log("Form Submitted", data);
  };


  const renderProfileImage = () => {
    return (
      <Box
        sx={{
          position: 'relative',
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: '#d3d3d3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <div onClick={()=>setShowImageUploadModal(true)}>
        {
          profileImage ? 
          <Image src={profileImage} alt="Base64 Image" style={{height:120,width:120}} />

          :
          <Typography color="text.secondary" fontSize={14}>
          No Image
        </Typography>}

        <IconButton
          sx={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            backgroundColor: '#ffffff',
            boxShadow: 1,
            p: 0.5,
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          aria-label="edit"
          size="small"
        >
          <EditIcon fontSize="small" />
        </IconButton>
        </div>
      </Box>
    )
  }


  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">User Registration</h2>

      <div className="flex flex-row  mb-6 sm:flex-col md:flex-row lg:flex-row xl:flex-row ">
        <div className="mr-4">
        {renderProfileImage()}
        </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Grid layout for fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
          <div>
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
              className="h-10 w-full rounded border border-gray-300 p-2"
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

          {/* Gender */}
          <div>
            <label className="mb-1 block font-medium">Gender *</label>
            <select
              className="h-10 w-full rounded border border-gray-300 p-2"
              {...register("gender", { required: "gender is required" })}
            >
              <option value="">Select</option>
              {gender.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
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

          {/* Date of Join */}
          <div>
            <label className="mb-1 block font-medium">Date of Birth *</label>
            <Controller
              control={control}
              name="doj"
              rules={{ required: "Date of join is required" }}
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
            {errors.doj && <p className="text-sm text-red-500">{errors.doj.message}</p>}
          </div>
        </div>
        
        {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 bg-orange-300 p-4 mt-4 rounded text-black"> */}
          <AutoCompleteDropDown options={[]} mode={'editable'} label='Select plan' value={paymentDetails.plan} onChange={(value) => setPaymentDetails({...paymentDetails,plan:value})} />

        {/* </div> */}

        {/* Submit Button */}
        <div>
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>

      </div>

      {showImageUploadModal && <Modal
          keepMounted
          open={showImageUploadModal}
          onClose={()=>{}}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={modalstyle}>
          <WebcamCapture getProfileImage={(image:string)=>{setShowImageUploadModal(false); setProfileImage(image)}}/>
          </Box>
        </Modal>}
    </div>
  );
}
