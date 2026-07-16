export type UserRole = "student" | "parent" | "teacher";

export interface OnboardingData {
  fullName: string;
  dateOfBirth: string;
  age: number;
  isMinor: boolean;
  role: UserRole | null;
  email: string;
  phoneNumber: string;
  password: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
}

export const initialOnboardingData: OnboardingData = {
  fullName: "",
  dateOfBirth: "",
  age: 0,
  isMinor: false,
  role: null,
  email: "",
  phoneNumber: "",
  password: "",
  guardianName: "",
  guardianEmail: "",
  guardianPhone: "",
};
