const InputField = ({ label, name, type = "text",value, onChange, required }) => (
    <div className="mb-4">
      <label htmlFor={name} className="text-white block mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={value}
        onChange={onChange}
        className="w-full p-2 rounded-md bg-white/10 text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
        required={required}
      />
    </div>
  );
  export default InputField;