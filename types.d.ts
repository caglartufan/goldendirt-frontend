type User = {
  id: number;
  username: string;
  email: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

type ValidationErrors<Values> = {
  [field in keyof Values]: string | Array<string>;
};

type FormikInvalidities<Values> = {
  [field in keyof Values]: boolean;
};
