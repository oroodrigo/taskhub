"use client";

import { signIn } from "next-auth/react";
import { GithubLogo, GoogleLogo, Warning } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { LoginForm, LoginUserFormData } from "@/components/forms/LoginForm";
import {
  RegisterForm,
  RegisterUserFormData,
} from "@/components/forms/RegisterForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Autentication() {
  const router = useRouter();
  const [autenticantionMode, setAutenticationMode] = useState<
    "login" | "register"
  >("login");

  const [erro, setErro] = useState("");

  function showErrorMessage(message: string, tempoEmSegundos = 5) {
    setErro(message);
    setTimeout(() => setErro(""), tempoEmSegundos * 1000);
  }

  function createUser(data: RegisterUserFormData) {
    axios.post("/api/user", data).then(() => {
      signIn("credentials", {
        name: data.name,
        email: data.email,
        password: data.password,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.ok) {
            router.push("/");
          }

          if (callback?.error) {
            showErrorMessage(callback.error);
          }
        })
        .catch(() => showErrorMessage("Alguma coisa deu errado!"));
    });
  }
  function handleSignIn(data: LoginUserFormData) {
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/");
        }

        if (callback?.error) {
          showErrorMessage(callback.error);
        }
      })
      .catch(() => showErrorMessage("Alguma coisa deu errado!"));
  }

  function handleChangeMode() {
    autenticantionMode === "login"
      ? setAutenticationMode("register")
      : setAutenticationMode("login");
  }

  return (
    <section className="flex h-screen items-center justify-center bg-zinc-900 text-white">
      <figure className="hidden md:w-1/2 lg:w-2/3 md:block">
        <Image
          className="h-screen w-full object-cover"
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Imagem da tela de autenticação"
          width={1920}
          height={1280}
          priority
        />
      </figure>
      <main className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className="text-xl font-bold">
          {autenticantionMode === "login"
            ? "Entre em nossa plataforma."
            : "Cadastre-se agora em nossa plataforma."}
        </h1>

        {erro.length > 0 ? (
          <div className="flex items-center my-2 py-3 px-5 bg-red-400 border-red-700 rounded-lg text-white">
            <Warning size={25} />
            <span className="ml-3">{erro}</span>
          </div>
        ) : (
          false
        )}

        {autenticantionMode === "login" ? (
          <LoginForm handleSignIn={handleSignIn} />
        ) : (
          <RegisterForm createUser={createUser} />
        )}

        <hr className="my-6 border-gray-300 w-full" />

        <button
          className={
            "flex items-center justify-center gap-5 w-full text-white rounded-lg px-4 py-3  bg-red-500 hover:bg-red-600"
          }
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <GoogleLogo size={25} />
          Entrar com Google
        </button>

        <button
          className={
            "flex items-center justify-center gap-5 mt-4 w-full text-white rounded-lg px-4 py-3 bg-gray-600 hover:bg-gray-700 "
          }
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <GithubLogo weight="fill" size={25} />
          Entrar com Github
        </button>

        {autenticantionMode === "login" ? (
          <p className="mt-8">
            Novo por aqui?
            <a
              onClick={handleChangeMode}
              className="font-semibold text-blue-500 cursor-pointer hover:text-blue-700"
            >
              {" "}
              Crie uma conta gratuitamente.
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a
              onClick={handleChangeMode}
              className="font-semibold text-blue-500 cursor-pointer hover:text-blue-700"
            >
              {" "}
              Entre com as suas credenciais.
            </a>
          </p>
        )}
      </main>
    </section>
  );
}
