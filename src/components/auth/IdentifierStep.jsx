import React, { useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

export const IdentifierStep = ({ onSubmit, isLoading, error }) => {
  const [identifier, setIdentifier] = useState("");
  const [fieldError, setFieldError] = useState("");

  const validateIdentifier = (value) => {
    if (!value.trim()) return "Campo requerido";
    if (value.includes("@")) {
      return /\S+@\S+\.\S+/.test(value) ? "" : "Email inválido";
    }
    return value.replace(/\D/g, "").length >= 8 ? "" : "Teléfono inválido";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateIdentifier(identifier);

    if (validationError) {
      setFieldError(validationError);
      return;
    }

    setFieldError("");
    onSubmit(identifier);
  };

  const isEmail = identifier.includes("@");

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-6">¿Cómo quieres ingresar?</h2>

      <Input
        type="text"
        placeholder="Email o teléfono"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        error={fieldError || error}
        autoFocus
      />

      {identifier && !fieldError && (
        <div className="text-sm text-gray-600">
          {isEmail
            ? "Usaremos tu email para enviarte un código"
            : "Te enviaremos un SMS con un código"}
        </div>
      )}

      <Button type="submit" isLoading={isLoading} className="w-full bg-black hover:bg-gray-900 text-white">
        Continuar
      </Button>
    </form>
  );
};
