import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

const schema = z.object({
    name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
    age: z.number().min(18, "O usuario deve ter no minimo 18 anos"),
    zipcode: z.string().min(5, "O CEP deve ter no mínimo 5 dígitos"),
    city: z.string().optional(),
    street: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function FormPage() {
    const {
        handleSubmit: submit,
        register,
        formState,
        clearErrors,
        watch,
        setValue,
        setError,
        reset,
    } = useForm<FormData>({
        defaultValues: {
            age: 0,
            name: "",
            zipcode: "",
            city: "",
            street: "",
        },
        resolver: zodResolver(schema),
    });

    const handleSubmit = submit((data) => {
        console.log(data);
        reset(data);
    });

    useEffect(() => {
        const { unsubscribe } = watch(async (formData, { name }) => {
            const zipcode = formData.zipcode ?? "";

            if (name === "zipcode" && zipcode.length >= 8) {
                const response = await fetch(
                    `https://viacep.com.br/ws/${zipcode}/json/`
                );
                const body = await response.json();

                if (body.erro) {
                    setError("zipcode", {
                        type: "validate",
                        message: "O CEP informado é inválido",
                    });

                    return;
                }

                setValue("city", body.localidade);
                setValue("street", body.logradouro);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [watch, setValue, setError]);

    const isDirty = Object.keys(formState.dirtyFields).length > 0;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
                <Input {...register("name")} placeholder="Name" />
                <ErrorMessage
                    errors={formState.errors}
                    name="name"
                    render={({ message }) => (
                        <span className="text-red-400">{message}</span>
                    )}
                />
                <Input
                    type="number"
                    {...register("age", { valueAsNumber: true })}
                    placeholder="Age"
                />
                <ErrorMessage
                    errors={formState.errors}
                    name="age"
                    render={({ message }) => (
                        <span className="text-red-400">{message}</span>
                    )}
                />
                <Input
                    type="number"
                    {...register("zipcode")}
                    placeholder="Zipcode"
                />
                <ErrorMessage
                    errors={formState.errors}
                    name="zipcode"
                    render={({ message }) => (
                        <span className="text-red-400">{message}</span>
                    )}
                />
                <Input {...register("city")} placeholder="City" />
                <Input {...register("street")} placeholder="Street" />
                <div>
                    <Button
                        className="mt-4"
                        disabled={!isDirty || formState.isSubmitting}
                    >
                        Salvar
                    </Button>
                    <Button
                        className="mt-4"
                        disabled={isDirty || formState.isSubmitting}
                    >
                        Enviar
                    </Button>
                </div>
                <div>
                    <Button
                        type="button"
                        security="sm"
                        variant={"outline"}
                        onClick={() => {
                            clearErrors();
                        }}
                    >
                        Limpar Erros
                    </Button>
                </div>
            </form>
        </div>
    );
}
