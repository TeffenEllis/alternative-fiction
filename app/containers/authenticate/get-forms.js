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
        maxLength: 60,
        name: "username",
        pattern: "^[a-zA-Z0-9-_]+$",
        placeholder: "Username",
        ref: "primaryField",
        required: true,
        title: "Usernames must only contain alpha-numeric characters, underscores, and dashes.",
        spellCheck: false,
        type: "text",
        value: ""
      },
      {
        name: "email",
        placeholder: "Email",
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
