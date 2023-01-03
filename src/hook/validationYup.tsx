import * as yup from "yup";

export const schema = yup.object().shape({
  id: yup
    .string()
    .min(6, "영문 소문자/숫자를 이용하여 6자리 이상 13자리 이하")
    .max(13, "영문 소문자/숫자를 이용하여 6자리 이상 13자리 이하"),
    // .matches(/^(?=.*[a-z])(?=.*\d)+$/)
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: yup
    .string()
    .min(8)
    .max(18)
    .matches(
      /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W))/,
      "비밀번호에 영문, 숫자, 특수문자를 포함해주세요."
    )
  // ^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$
  // /^(?=.*[a-z0-9])(?=.*\d)(?=.*[@$!%*#?&])[a-z\d@$!%*#?&]$/
    // .matches(/^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W))/, "영문자/특수문자/숫자를 포함하여 8자리 이상 16자리 이하")
    .required(),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다."),
  // email: yup
  //   .string()
  //   .email("정확한 이메일을 입력해주세요")
  //   .required(),
})