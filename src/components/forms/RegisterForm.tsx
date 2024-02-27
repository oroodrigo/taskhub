"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface RegisterFormProps {
  createUser: (data: RegisterUserFormData) => void;
}

const registerUserFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "O campo não pode estar vazio.")
      .transform((name) => {
        return name
          .trim()
          .split(" ")
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(" ");
      }),
    email: z
      .string()
      .min(1, "O campo não pode estar vazio.")
      .min(10, "O campo deve conter no minimo 10 caracteres")
      .email("Formato de email inválido."),
    password: z.string().min(8, "A senha precisa de no mínimo 8 caracteres."),
    confirm_password: z
      .string()
      .min(8, "A senha precisa de no mínimo 8 caracteres."),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais.",
        path: ["confirm_password"],
      });
    }
  });

export type RegisterUserFormData = z.infer<typeof registerUserFormSchema>;

export function RegisterForm({ createUser }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserFormSchema),
  });

  return (
    <form
      className="flex flex-col w-full gap-3"
      onSubmit={handleSubmit(createUser)}
    >
      <fieldset className="flex flex-col gap-2 mt-2">
        <label>Nome</label>
        <input
          className="px-4 py-3 text-black rounded-lg bg-gray-200 border focus:border-blue-500 focus:outline-none"
          type="text"
          {...register("name")}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </fieldset>

      <fieldset className="flex flex-col gap-2 mt-2">
        <label>Email</label>
        <input
          className="px-4 py-3 text-black rounded-lg bg-gray-200 border focus:border-blue-500 focus:outline-none"
          type="email"
          {...register("email")}
        />

        {errors.email && <span>{errors.email.message}</span>}
      </fieldset>

      <fieldset className="flex flex-col gap-2 mt-2">
        <label>Senha</label>
        <input
          className="px-4 py-3 text-black rounded-lg bg-gray-200 border focus:border-blue-500 focus:outline-none"
          type="password"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </fieldset>

      <fieldset className="flex flex-col gap-2 mt-2">
        <label>Confime sua Senha</label>
        <input
          className="px-4 py-3 text-black rounded-lg bg-gray-200 border focus:border-blue-500 focus:outline-none"
          type="password"
          {...register("confirm_password")}
        />
        {errors.confirm_password && (
          <span>{errors.confirm_password.message}</span>
        )}
      </fieldset>

      <button
        className="w-full text-white rounded-lg px-4 py-3 mt-6 bg-indigo-500 hover:bg-indigo-600
        "
      >
        Cadastrar
      </button>
    </form>
  );
}
