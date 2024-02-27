"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormProps = {
  handleSignIn: (data: LoginUserFormData) => void;
};

const loginUserFormSchema = z.object({
  email: z
    .string()
    .min(1, "O campo não pode estar vazio.")
    .email("Formato de email inválido."),
  password: z.string().min(8, "A senha precisa de no mínimo 8 caracteres."),
});

export type LoginUserFormData = z.infer<typeof loginUserFormSchema>;

export function LoginForm({ handleSignIn }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(handleSignIn)}>
      <fieldset className="flex flex-col gap-2 mt-2">
        <label>Email</label>
        <input
          className="px-4 py-3 text-black rounded-lg bg-gray-200 border focus:border-blue-500 focus:outline-none"
          type="text"
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

      <button
        className="w-full text-white rounded-lg px-4 py-3 mt-6 bg-indigo-500 hover:bg-indigo-600
          "
      >
        Entrar
      </button>
    </form>
  );
}
