type User = {
  username: string;
  email_verified_at?: Date;
};

type ValidationErrors<Values> = {
  [field in keyof Values]: string | Array<string>;
};

type FormikInvalidities<Values> = {
  [field in keyof Values]: boolean;
};
