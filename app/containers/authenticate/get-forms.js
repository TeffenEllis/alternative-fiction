export default function getForms(user) {
  return {
    login: [
      {
        autoFocus: true,
        name: "email",
        placeholder: "Email",
        ref: "primaryField",
        required: true,
        type: "email",
        value: user && user.email || ""
      },
      {
        name: "password",
        placeholder: "Password",
        required: true,
        type: "password",
        value: ""
      }
    ],
    register: [
      {
        autoFocus: true,
        name: "email",
        placeholder: "Email",
        ref: "primaryField",
        required: true,
        type: "email",
        value: ""
      },
      {
        name: "password",
        placeholder: "Password",
        required: true,
        type: "password",
        value: ""
      }
    ]
  }
}
