import { environment } from '../../environments/environment';
export const CONFIGURATIONS = {
  DEV: {
    TOKEN_KEY: 'dG9rZW4',
    USER_CREDENTIALS: 'DcmVkZW',
    ENC_KEY: 'WFsQ1JN',
    USER_DETAILS: 'RldGFpbHM',
    LEAD_ID: 'ld23wzxd',
  },

  LIVE: {
    TOKEN_KEY: 'dG9rZW4',
    USER_CREDENTIALS: 'DcmVkZW',
    ENC_KEY: 'WFsQ1JN',
    USER_DETAILS: 'RldGFpbHM',
    LEAD_ID: 'ld23wzxd',
  },
};

export const Custom_Regex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  spaces: /(?!^ +$)^.+$/,
  username: /^([a-zA-Z0-9-_])/,
  EMAIL_REGEX_COMMA_SEPRATED:
    /^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  name: /^(?=.*[a-zA-Z])/,
  password: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  digitsOnly: /^\d+$/,
  amount: /^\d*(\.\d+)?$/,
  lettersOnly: /^[a-zA-Z_ ]+$/,
  date: /^\d{1,2}\-\d{1,2}\-\d{4}$/,
  address: /^([a-zA-Z0-9., -_/#=$()&])/,
  address2: /^(?=.*[a-zA-Z0-9])/,
  city: /^([a-zA-Z0-9])/
};

export const SETTINGS = environment.production
  ? CONFIGURATIONS['LIVE']
  : CONFIGURATIONS['DEV'];
