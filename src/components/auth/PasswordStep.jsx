import React, { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { authService } from "../../services/authService";

export const PasswordStep = ({ identifier, onBack }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setError("La contraseña es requerida");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.loginWithPassword(identifier, password);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <button type="button" onClick={onBack} className="text-gray-600 hover:text-black mb-4">
        Cambiar cuenta
      </button>

      <h2 className="text-2xl font-semibold text-center mb-2">Ingresa tu contraseña</h2>
      <p className="text-center text-gray-600 mb-6">{identifier}</p>

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? "Ocultar" : "Ver"}
        </button>
      </div>

      <Button type="submit" isLoading={isLoading} className="w-full bg-black hover:bg-gray-900 text-white">
        Iniciar sesión
      </Button>
    </form>
  );
};
