import { useCallback, useState, type FormEvent } from "react";

export const TestAuthForm = () => {
  const [formVar, setFormVar] = useState(1);

  const handleSubmitForm = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const elements = e.target;

      const firstInputKey = formVar === 1 ? "email" : "user_name";
      const secondInputKey = formVar === 1 ? "email_pass" : "user_pass";
      //обработка данных с полей ввода
      console.log(elements[firstInputKey]?.value, " first input");
      console.log(elements[secondInputKey]?.value, " second input");

      e.target?.reset();
    },
    [formVar]
  );
  const renderChosenForm = useCallback(() => {
    if (formVar === 1) {
      return (
        <form onSubmit={handleSubmitForm}>
          <input type="email" placeholder="email" required name="email" />
          <input
            type="password"
            placeholder="pass"
            required
            name="email_pass"
            minLength={6}
          />
          <button>Login</button>
        </form>
      );
    }
    if (formVar === 2) {
      return (
        <form onSubmit={handleSubmitForm}>
          <input type="text" placeholder="name" required name="user_name" />
          <input
            name="user_pass"
            type="password"
            placeholder="pass"
            minLength={6}
            required
          />
          <button>Login</button>
        </form>
      );
    }
  }, [formVar]);

  return (
    <section>
      <label htmlFor="change_mail">Mail </label>
      <input
        id="change_mail"
        type="radio"
        checked={formVar === 1}
        value={1}
        onChange={() => setFormVar(1)}
      />
      <label htmlFor="change_name">Name</label>
      <input
        id="change_name"
        type="radio"
        checked={formVar === 2}
        value={2}
        onChange={() => setFormVar(2)}
      />
      {renderChosenForm()}
    </section>
  );
};
