export interface UserSigningInfo {
  password: string;
  email: string;
}

export interface UserAdditionalInfo {
  uid?: string;
  userName: string
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  age: number;
  dateOfBirth: string;
  gender: 'male' | 'female';
  newTrainings?: object[];
  completedTrainings?: object[];
}
