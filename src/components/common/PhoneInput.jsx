/**
 * Indian phone input with a permanent +91 prefix.
 *
 * The prefix is visual and cannot be deleted. The value passed to the parent is
 * either an empty string or a complete-looking "+91 9876543210" value, so an
 * untouched field never creates a broken call/WhatsApp link.
 */

export const INDIA_CODE = "+91";

/** Return the 10 local digits from a stored Indian phone value. */
export function localPhoneDigits(value = "") {
  let str = String(value).trim();
  // Stored values look like "+91 98765..." - drop the prefix literally, so a
  // partly typed number is never mistaken for part of the country code.
  if (str.startsWith("+91")) str = str.slice(3);
  let digits = str.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length > 10 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length > 10) digits = digits.slice(-10);
  return digits.slice(0, 10);
}

/** Full stored value, or empty while no local digits have been entered. */
export function toIndianPhone(localDigits = "") {
  const digits = localPhoneDigits(localDigits);
  return digits ? `${INDIA_CODE} ${digits}` : "";
}

export function isCompleteIndianPhone(value = "") {
  return localPhoneDigits(value).length === 10;
}

export default function PhoneInput({
  value,
  onChange,
  placeholder = "90909 09090",
  className = "",
  inputClassName = "",
  style,
  required = false,
  ariaLabel = "Phone number",
  disabled = false,
}) {
  const local = localPhoneDigits(value);

  return (
    <div
      className={`flex w-full items-center overflow-hidden rounded-xl border bg-white transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 ${className}`}
      style={style}
    >
      <span className="flex h-full shrink-0 items-center border-r border-black/10 bg-black/[0.035] px-3 py-3 text-sm font-semibold text-[#55555E]">
        {INDIA_CODE}
      </span>
      <input
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        value={local}
        onChange={(e) => {
          const raw = e.target.value;
          // Pasted numbers like "+91 98765 43210" / "919876543210" / "098765..." are cleaned;
          // normal typing just keeps the first 10 digits.
          const digits = raw.replace(/\D/g, "");
          const pasted = raw.trim().startsWith("+") || digits.length >= 12 || (digits.length === 11 && digits.startsWith("0"));
          onChange?.(toIndianPhone(pasted ? localPhoneDigits(raw) : digits.slice(0, 10)));
        }}
        placeholder={placeholder}
        maxLength={16}
        required={required}
        disabled={disabled}
        aria-label={ariaLabel}
        className={`min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-black/25 ${inputClassName}`}
      />
    </div>
  );
}