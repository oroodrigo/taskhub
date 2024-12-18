"use client";
import { Layout } from "@/components/ui/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilSimpleLine } from "@phosphor-icons/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editProfileSchema = z.object({
  id: z.string().cuid('formato errado'),
  firstName: z.string(),
  lastName: z.string(),
  imageUrl: z.string().url('formato errado').nullable(),
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>

export default function Profile() {
  const { data: session, update } = useSession()
  let firstName
  let lastName

  const formattedUsername =
    session?.user.name &&
    session?.user.name
      .trim()
      .split(" ")
      .map((word) => {
        return (
          word[0]
            .toLocaleUpperCase()
            .concat(word.substring(1).toLocaleLowerCase())
        );
      });

      if(formattedUsername) {
        firstName = formattedUsername[0]
        lastName = formattedUsername.slice(1).join(" ")
      }


  const { register, handleSubmit, formState: { isLoading, errors }, reset } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      id: session?.user.id,
      firstName: firstName,
      lastName: lastName,
      imageUrl: session?.user.image,
    }
  })

  async function handleEditProfile(formData: EditProfileSchema) {
    const { data } = await axios.put('/api/user', formData)

    await update(data)
    reset()
  }

  return (
    <Layout title="Perfil">
      <main className="flex flex-col gap-5">
        <h1 className="text-xl">Personalize da sua forma! 😎</h1>
        <form className="flex flex-col w-full xl:w-1/2 2xl:w-1/3 gap-3" onSubmit={handleSubmit(handleEditProfile)}>
          <fieldset className="flex flex-col gap-2 mt-2">
            <label className="text-base font-semibold inline-block">Primeiro Nome</label>
            <input
              className="px-4 py-3 text-gray-200 rounded-lg bg-zinc-950 border border-zinc-900 focus:border-form-toggle-button-bg-green/50 focus:outline-none"
              type="text"
              {...register("firstName")}
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </fieldset>

          <fieldset className="flex flex-col gap-2 mt-2">
            <label className="text-base font-semibold inline-block">Último Nome</label>
            <input
              className="px-4 py-3 text-gray-200 rounded-lg bg-zinc-950 border border-zinc-900 focus:border-form-toggle-button-bg-green/50 focus:outline-none"
              type="text"
              {...register("lastName")}
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
          </fieldset>

          <fieldset className="flex flex-col gap-2 mt-2">
            <label className="text-base font-semibold inline-block">Imagem de perfil (URL)</label>
            <input
              className="px-4 py-3 text-gray-200 rounded-lg bg-zinc-950 border border-zinc-900 focus:border-form-toggle-button-bg-green/50 focus:outline-none"
              type="text"
              placeholder="Cole a url de uma imagem aqui"
              {...register("imageUrl")}
            />
            {errors.imageUrl && <span>{errors.imageUrl.message}</span>}
          </fieldset>

          <button
            className="flex items-center justify-center self-start gap-2 mt-5 w-full md:w-1/4 h-12 border-none outline-none bg-green-600 py-2 px-4 text-lg rounded-md hover:bg-green-700 transition-colors"
            type="submit"
            disabled={isLoading}
          >
            Editar
            <PencilSimpleLine className="hidden md:block" size={25} weight="light" />
          </button>
        </form>
      </main>
    </Layout>
  );
}
