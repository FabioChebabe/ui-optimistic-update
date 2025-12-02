import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

interface IFormData {
    name: string;
    age: number;
}

export default function FormPage() {
    const { handleSubmit: submit, register, formState } = useForm<IFormData>();
    const handleSubmit = submit((data) => {
        console.log(data);
    });

    console.log("Render FormPage");

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="text"
                    className="border rounded-md"
                    {...register("name", {
                        required: { value: true, message: "Name is required" },
                        minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters long",
                        },
                    })}
                />
                <ErrorMessage
                    errors={formState.errors}
                    name="name"
                    render={({ message }) => (
                        <span className="text-red-400">{message}</span>
                    )}
                />
                {/* {formState.errors.name && (
                    <span className="text-red-400">
                        {formState.errors.name?.message}
                    </span>
                )} */}
                <input
                    type="number"
                    className="border rounded-md"
                    {...register("age")}
                />
                <button type="submit">Submeter</button>
            </form>
        </div>
    );
}
