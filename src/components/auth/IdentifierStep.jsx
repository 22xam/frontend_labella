import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

export const IdentifierStep = ({ onSubmit, isLoading, error }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const identifier = watch("identifier");
  const isEmail = identifier?.includes("@");

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data.identifier))}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        ¿Cómo quieres ingresar?
      </h2>

      <Input
        {...register("identifier", {
          required: "Campo requerido",
          validate: (value) => {
            if (value.includes("@")) {
              return /\S+@\S+\.\S+/.test(value) || "Email inválido";
            }
            return value.replace(/\D/g, "").length >= 8 || "Teléfono inválido";
          },
        })}
        type="text"
        placeholder="Email o teléfono"
        error={errors.identifier?.message || error}
        icon={isEmail ? Mail : Phone}
        autoFocus
      />

      {identifier && !errors.identifier && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {isEmail ? (
            <>
              <Mail size={16} />
              <span>Usaremos tu email para enviarte un código</span>
            </>
          ) : (
            <>
              <Phone size={16} />
              <span>Te enviaremos un SMS con un código</span>
            </>
          )}
        </div>
      )}

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full bg-black hover:bg-gray-900 text-white"
      >
        Continuar
        <ArrowRight size={20} className="ml-2" />
      </Button>
    </form>
  );
};
