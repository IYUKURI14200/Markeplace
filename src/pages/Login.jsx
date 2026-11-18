import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { loginUser, friendlyAuthError } from "../services/authService";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = {};
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    setErrors(e);
    if (Object.keys(e).length) return;
    try {
      setSubmitting(true);
      await loginUser(form.email.trim(), form.password);
      navigate("/");
    } catch (err) {
      setErrors({ form: friendlyAuthError(err.code) });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Log in</h1>
      {errors.form && <p className="mb-4 rounded bg-red-100 p-2 text-red-700">{errors.form}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
        <FormInput label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
        <button disabled={submitting} className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
          {submitting ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        No account? <Link to="/register" className="text-blue-600 underline">Sign up</Link>
      </p>
    </div>
  );
}