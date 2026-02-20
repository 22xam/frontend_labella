import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IdentifierStep } from "./IdentifierStep";
import { PasswordStep } from "./PasswordStep";
import { OtpStep } from "./OtpStep";
import { SocialButtons } from "./SocialButtons";
import { PasskeyButton } from "./PasskeyButton";
import { Divider } from "../common/Divider";

export const LoginScreen = () => {
  const [step, setStep] = useState("identifier");
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleIdentifierSubmit = async (identifierValue) => {
    setIsLoading(true);
    setError(null);
    setIdentifier(identifierValue);

    try {
      // Simular verificación en backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Determinar método según el identifier
      const method = identifierValue.includes("@") ? "password" : "otp";
      setStep(method);
    } catch (err) {
      setError("Error verificando identificador");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "identifier":
        return (
          <IdentifierStep
            onSubmit={handleIdentifierSubmit}
            isLoading={isLoading}
            error={error}
          />
        );
      case "password":
        return (
          <PasswordStep
            identifier={identifier}
            onBack={() => setStep("identifier")}
          />
        );
      case "otp":
        return (
          <OtpStep
            identifier={identifier}
            onBack={() => setStep("identifier")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black">Uber</h1>
        </div>

        {/* Ilustración */}
        <div className="relative h-40 mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-green-400 to-blue-500">
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Paso actual */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Solo mostrar sociales en paso identifier */}
        {step === "identifier" && (
          <>
            <Divider text="o continúa con" />
            <SocialButtons />
            <PasskeyButton />
          </>
        )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Al continuar, aceptas nuestros{" "}
          <a href="/terms" className="text-black underline">
            Términos
          </a>{" "}
          y{" "}
          <a href="/privacy" className="text-black underline">
            Política de Privacidad
          </a>
        </p>
      </motion.div>
    </div>
  );
};
