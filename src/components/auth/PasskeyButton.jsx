import React from "react";
import { Fingerprint } from "lucide-react";
import { Button } from "../common/Button";

export const PasskeyButton = () => {
  const handlePasskeyLogin = async () => {
    if (window.PublicKeyCredential) {
      try {
        // Simular autenticación con passkey
        console.log("Iniciando autenticación con passkey...");
        alert("Autenticación con passkey (simulada)");
      } catch (error) {
        console.error("Error con passkey:", error);
      }
    } else {
      alert("Tu dispositivo no soporta passkeys");
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handlePasskeyLogin}
      className="w-full mt-3"
      icon={<Fingerprint size={20} />}
    >
      Usar passkey o huella digital
    </Button>
  );
};
