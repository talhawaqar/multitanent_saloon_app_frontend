import * as Yup from "yup";

export const personalInfoSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const businessInfoSchema = Yup.object({
  businessName: Yup.string().required("Business name is required"),
  businessDescription: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .required("Business description is required"),
});

export const locationsSchema = Yup.object({
  locations: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Location name is required"),
        address: Yup.string().required("Address is required"),
        contact: Yup.string().required("Contact number is required"),
      })
    )
    .min(1, "At least one location is required"),
});

export const servicesSchema = Yup.object({
  services: Yup.array()
    .of(
      Yup.object({
        id: Yup.number().required(),
        name: Yup.string().required(),
        duration: Yup.number()
          .min(15, "Duration must be at least 15 minutes")
          .max(480, "Duration cannot exceed 8 hours")
          .required("Duration is required"),
        price: Yup.number()
          .min(1, "Chagrges Must be grater then Zero")
          .required("Charges is required"),
      })
    )
    .min(1, "Please select at least one service"),
});
