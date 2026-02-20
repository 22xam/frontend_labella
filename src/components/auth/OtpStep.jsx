import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Smartphone } from "lucide-react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

export const OtpStep = ({ identifier, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Aquí iría la lógica de verificación del código
    console.log("Código:", data.otp);
    setTimeout(() => {
      setIsLoading(false);
      alert("Código verificado (simulado)");
    }, 1500);
  };

  const resendCode = () => {
    setTimeLeft(60);
    setCanResend(false);
    alert("Nuevo código enviado (simulado)");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-4"
      >
        <ArrowLeft size={20} />
        <span>Cambiar cuenta</span>
      </button>

      <h2 className="text-2xl font-semibold text-center mb-2">
        Ingresa el código
      </h2>

      <p className="text-center text-gray-600 mb-2">{identifier}</p>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
        <Smartphone size={16} />
        <span>Te enviamos un código de 6 dígitos</span>
      </div>

      <Input
        {...register("otp", {
          required: "Código requerido",
          pattern: {
            value: /^[0-9]{6}$/,
            message: "Ingresa 6 dígitos",
          },
        })}
        type="text"
        placeholder="123456"
        maxLength={6}
        error={errors.otp?.message}
        className="text-center text-2xl tracking-widest"
        autoFocus
      />

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full bg-black hover:bg-gray-900 text-white"
      >
        Verificar código
      </Button>

      <div className="text-center">
        {canResend ? (
          <button
            type="button"
            onClick={resendCode}
            className="text-sm text-gray-600 hover:underline"
          >
            Reenviar código
          </button>
        ) : (
          <p className="text-sm text-gray-400">
            Reenviar en {timeLeft} segundos
          </p>
        )}
      </div>
    </form>
  );
};
