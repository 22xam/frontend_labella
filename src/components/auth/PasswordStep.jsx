import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { authService } from "../../services/authService";

export const PasswordStep = ({ identifier, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.loginWithPassword(
        identifier,
        data.password
      );
      console.log("Login exitoso:", response);
      // Redirigir al usuario
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.detail || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
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
        Ingresa tu contraseña
      </h2>

      <p className="text-center text-gray-600 mb-6">{identifier}</p>

      <div className="relative">
        <Input
          {...register("password", { required: "La contraseña es requerida" })}
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          error={errors.password?.message || error}
          icon={Lock}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full bg-black hover:bg-gray-900 text-white"
      >
        Iniciar sesión
      </Button>

      <button
        type="button"
        className="text-sm text-gray-600 hover:underline mx-auto block"
        onClick={() => alert("Recuperar contraseña")}
      >
        ¿Olvidaste tu contraseña?
      </button>
    </form>
  );
};
