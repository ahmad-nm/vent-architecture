export default function InputField({
    label,
    type = "text",
    placeholder,
    textarea = false
}) 
{
    return (
        <div className="space-y-3">

            <label className="text-sm uppercase tracking-wider text-white/50">
                {label}
            </label>

            {textarea ? (
                <textarea
                    rows="6"
                    placeholder={placeholder}
                    className="
                        w-full
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.02]
                        px-5 py-4
                        text-white
                        placeholder:text-white/30
                        outline-none
                        focus:border-white/30
                        transition
                        resize-none
                    "
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className="
                        w-full
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.02]
                        px-5 py-4
                        text-white
                        placeholder:text-white/30
                        outline-none
                        focus:border-white/30
                        transition
                    "
                />
            )}

        </div>
    );
}