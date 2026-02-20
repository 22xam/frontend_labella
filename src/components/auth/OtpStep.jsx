import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

export const OtpStep = ({ identifier, onBack }) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState("");

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!/^[0-9]{6}$/.test(otp)) {
      setError("Ingresa 6 dígitos");
      return;
    }

    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Código verificado (simulado)");
    }, 1500);
  };

  const resendCode = () => {
    setTimeLeft(60);
    alert("Nuevo código enviado (simulado)");
  };

  const canResend = timeLeft === 0;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <button type="button" onClick={onBack} className="text-gray-600 hover:text-black mb-4">
        Cambiar cuenta
      </button>

      <h2 className="text-2xl font-semibold text-center mb-2">Ingresa el código</h2>
      <p className="text-center text-gray-600 mb-2">{identifier}</p>

      <Input
        type="text"
        placeholder="123456"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        error={error}
        className="text-center text-2xl tracking-widest"
        autoFocus
      />

      <Button type="submit" isLoading={isLoading} className="w-full bg-black hover:bg-gray-900 text-white">
        Verificar código
      </Button>

      <div className="text-center">
        {canResend ? (
          <button type="button" onClick={resendCode} className="text-sm text-gray-600 hover:underline">
            Reenviar código
          </button>
        ) : (
          <p className="text-sm text-gray-400">Reenviar en {timeLeft} segundos</p>
        )}
      </div>
    </form>
  );
};
