import { useState } from "react";
import FormInput from "./FormInput";

export default function ListingForm({ initial, onSubmit, submitLabel }) {
  const [form, setForm] = useState(
    initial || { title: "", description: "", price: "", contactPhone: "" }
  );
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(ev) {
    ev.preventDefault();
    const e = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (form.price === "" || Number(form.price) < 0 || isNaN(Number(form.price)))
      e.price = "Enter a valid price.";
    setErrors(e);
    if (Object.keys(e).length) return;
    try {
      setSubmitting(true);
      await onSubmit(form);
    } catch (err) {
      console.error(err);
      setErrors({ form: "Could not save. Please try again." });
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-lg rounded-xl bg-white p-6 shadow">
      {errors.form && <p className="mb-4 rounded bg-red-100 p-2 text-red-700">{errors.form}</p>}
      <FormInput label="Title" name="title" value={form.title} onChange={handleChange} error={errors.title} />
      <FormInput label="Price" name="price" type="number" value={form.price} onChange={handleChange} error={errors.price} />
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description" rows="4" value={form.description} onChange={handleChange}
          className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      <FormInput label="Phone (optional)" name="contactPhone" value={form.contactPhone} onChange={handleChange} />
      <button disabled={submitting} className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}