export default function getForms(user) {
  user = user || {}

  return [
    {
      autoComplete: "new-username",
      autoFocus: true,
      name: "displayName",
      placeholder: "Display Name",
      ref: "primaryField",
      type: "text",
      value: ""
    },
    {
      autoComplete: "new-email",
      name: "email",
      placeholder: "New Email",
      type: "email",
      value: ""
    },
    {
      autoComplete: "new-password",
      name: "password",
      placeholder: "New Password",
      type: "password",
      value: ""
    }
  ]
}
