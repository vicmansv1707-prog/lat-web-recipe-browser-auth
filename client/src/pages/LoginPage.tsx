import { useFormWithValidation } from "../hooks/useFormWithValidation";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

const { values, errors, isValid, handleChange } = useFormWithValidation();
const [submitError, setSubmitError] = useState("");

const { login } = useAuth();
const navigate = useNavigate();

async function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  if (!isValid) return;
  try {
   const { token, user } = await loginUser(values.email, values.password);
   login(token, user);
   navigate("/");
 } catch (err) {
   setSubmitError(err instanceof Error ? err.message : "Algo salió mal");
 };
};

return (
  <form className="form" onSubmit={handleSubmit} noValidate>
    <h1 className="form__title" >Iniciar sesión</h1>
    <div className="form__input-container">
      <label className="form__label">
        Correo electrónico
        <input
          className="form__input"
          name="email"
          type="email"
          minLength={10}
          required
          value={values.email ?? ''}
          onChange={handleChange}
        />
      </label>
      {errors.email && <p className="form__error">{errors.email}</p>}
    </div>
    <div className="form__input-container" >
      <label className="form__label">
        Contraseña
        <input
          className="form__input"
          name="password"
          type="password"
          minLength={8}
          required
          value={values.password ?? ''}
          onChange={handleChange}
        />
      </label>
      {errors.password && <p className="form__error">{errors.password}</p>}
    </div>
    <button className="form__submit-btn" type="submit" disabled={!isValid}>
      Inciar sesión
    </button>
    {submitError && <p className="form__error">{submitError}</p>}
  </form>
);    
};



